//getTopCreators函数,接收一个cretors数组作为参数
export const getTopCreators = (creators) => {
  const finalCreators = [];

  //调用reduce函数为finalResults数组赋值,reduce函数可以到MDMA处去解答
  const finalResults = creators.reduce((index, currentValue) => {
    (index[currentValue.seller] = index[currentValue.seller] || []).push(
      currentValue
    );

    return index;
  }, {});

  Object.entries(finalResults).forEach((item) => {
    const seller = item[0];

    //因为这个NFT数组具有各种各样的属性,比如NFT的详细信息,比如图像等,但是我们只关注价格
    const total = item[1]
      .map((newItem) => Number(newItem.price))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    finalCreators.push({ seller, total });
  });

  return finalCreators; //在这个数组中我们将获得卖家的地址,获得他们所拥有NFT的总价值(ETH的形式计算)
};
