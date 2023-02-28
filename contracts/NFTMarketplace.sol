// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter; //获得计数器类型
    //计数器类型的变量
    Counters.Counter private _tokenIds; //每个NFT的Id都是唯一的
    Counters.Counter private _itemsSold; //销售属性，将跟踪有多少条目被出售

    uint256 listingPrice = 0.025 ether; //合约市场的手续费
    address payable owner; //NFT的所有者
    //因此，当我们部署智能合约时，无论谁部署智能合约，都将成为该NFT交易市场合约的所有者

    mapping(uint256 => MarketItem) private idToMarketItem; //通过id映射到MarketItem这个结构体，这个结构体中包含该特定NFT的所有详细信息

    struct MarketItem {
        uint256 tokenId; //toeknId
        address payable seller; //卖家
        address payable owner; //铸造NFT的人
        uint256 price; //价格
        bool sold; //跟踪NFT是否售出
    }

    //发生代币生成时触发此事件
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only owner of the marketplace can change the listing price"
        );
        _;
    }

    //在ERC721的输入参数中分配NFT的name和symbol
    //对于ERC721这种OpenZeppelin提供的包来说，只要输入参数到位，构造函数的其他内容都由OpenZeppelin来处理
    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    } //构造函数由于是智能合约在部署时首先调用的函数，所以在这里的msg.sender是合约创建者

    //人们在我们的应用程序中进行任何交易的时候可以通过这个函数收取一定量的手续费
    //这个函数只能够由智能合约的所有者调用
    /* Updates the listing price of the contract */
    function updateListingPrice(
        uint256 _listingPrice
    ) public payable onlyOwner {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    //获取手续费价格
    //因为我们读取的是状态变量，所以必须使用view
    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    //在这个函数中我们创建出一个代币并分配给一个特定的tokenid
    //tokenURI实际上是NFT的URL,所以当有人上传NFT时我们将得到这个NFT的URL，并且该NFT会有一个特定的Id
    //返回值是tokenId
    /* Mints a token and lists it in the marketplace */
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds.increment(); //tokenId从1开始
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    //将在内部调用这个函数
    function createMarketItem(uint256 tokenId, uint256 price) private {
        //做一些检查约束
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        ); //在创造条目时附带的手续费是否符合标准

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender), //msg.sender是调用此函数的人,也就是卖家
            payable(address(this)), //address(this)意味着NFT属于合约本身
            price,
            false
        ); //在映射中添加新条目

        //将NFT从创建NFT的msg.sender转移到合约
        //form,to,tokenId
        _transfer(msg.sender, address(this), tokenId);
        //函数末尾触发专属事件
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    } //在这个函数中我们获取包含所有Nft的NftMarketItem，而且分配给特定NFT tokenId对应的结构体变量的所有数据

    //这个转售函数将允许用户出售他们的NFT
    //这个函数相当于创建订单
    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        //做一些检查条件
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        ); //每当有人在应用程序中进行任何交易时我们都必须收取佣金

        //更新条目信息
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        //所以当有人转售他们的NFT时,NFT将转到合约里,并且合约将成为NFT的所有者

        //每次只要有人购买NFT时,NFT的销售数量都会增加;但是当有人转售时,销售数量会减少
        //转售的时候相当于把市场上的NFT送到了合约中,这时候市场上少了一个NFT
        _itemsSold.decrement();

        //将NFT从卖家地址转移到合约。
        _transfer(msg.sender, address(this), tokenId);
    }

    //这个函数与reSellToken函数联合使用
    //这个函数相当于创建订单后的正式付款
    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        //更新条目信息
        idToMarketItem[tokenId].owner = payable(msg.sender); //调用此函数且正常付款的买家会成为NFT的所有者
        idToMarketItem[tokenId].sold = true; //表示NFT售出了
        idToMarketItem[tokenId].seller = payable(address(0)); //当在接受者的字段上填上0地址的时候，EVM就会明白这笔交易打算创建一个新的合约
        _itemsSold.increment(); //销售数量+1
        _transfer(address(this), msg.sender, tokenId); //将NFT从合约中转入到买家地址中。
        payable(owner).transfer(listingPrice); //买家(合约调用者)转给合约部署者手续费
        payable(idToMarketItem[tokenId].seller).transfer(msg.value); //让买家把买NFT的钱转给卖家
    }

    //显示智能合约中所有未售出的NFT的信息
    //返回值是结构体数组
    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current(); //首先获得当前条目总数
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current(); //获得当前未售出的NFT条目数量(总条目数-已售出的)
        uint256 currentIndex = 0; //为了循环遍历NFT条目做准备

        //要在items里存储所有未售出的NFT的信息
        //这是个静态数组
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        //通过循环把未售出NFT的信息存储到items数组中
        for (uint256 i = 0; i < itemCount; i++) {
            //i+1的原因是tokenId是从1开始计数的
            //.owner == address(this)的原因是我们只存储未售出的NFT信息
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId]; //通过局部变量跟踪信息
                items[currentIndex] = currentItem; //往状态变量中存储信息
                currentIndex += 1;
            }
        }
        return items;
    }

    //显示用户所持有的所有NFT的信息
    //一旦有人购买了NFT,将在个人资料的NFT收藏中显示所有购买的NFT
    //返回值是NFT数组,因为一个人可以有多个NFT
    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current(); //首先获得当前NFT的总数
        uint256 itemCount = 0; //用户持有的NFT条目数
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            //i+1的原因是tokenId是从1开始计数的
            //.owner == msg.sender的原因是我们只存储调用合约的人所持有的NFT(用户)
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1; //来获得用户所持有的NFT条目数
            }
        }

        //要在items里存储用户所有的NFT的信息
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            //i+1的原因是tokenId是从1开始计数的
            //.owner == address(this)的原因是我们只存储未售出的NFT信息
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId]; //通过局部变量跟踪信息
                items[currentIndex] = currentItem; //往状态变量中存储信息
                currentIndex += 1;
            }
        }
        return items;
    }

    //卖家单独显示关于正在售卖的NFT的信息
    //返回值同样也是NFT数组
    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current(); //获得当前NFT的总数
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId]; //通过局部变量跟踪信息
                items[currentIndex] = currentItem; //往状态变量中存储信息
                currentIndex += 1;
            }
        }
        return items;
    }
}
