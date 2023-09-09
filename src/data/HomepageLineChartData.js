const data = [
  { average_price: "2227200.0000", post_code: "2000", year_sold: "2014" },
  { average_price: "2064346.1538", post_code: "2000", year_sold: "2015" },
  { average_price: "2416214.2857", post_code: "2000", year_sold: "2016" },
  { average_price: "1774642.2500", post_code: "2000", year_sold: "2017" },
  { average_price: "1473727.1818", post_code: "2000", year_sold: "2018" },
  { average_price: "1239090.9091", post_code: "2000", year_sold: "2019" },
  { average_price: "285446.4286", post_code: "2000", year_sold: "2020" },
  { average_price: "2420000.0000", post_code: "2000", year_sold: "2021" },
  { average_price: "278683.3333", post_code: "2000", year_sold: "2022" },
  { average_price: "1332500.0000", post_code: "2007", year_sold: "2014" },
  { average_price: "1392000.0000", post_code: "2007", year_sold: "2015" },
  { average_price: "1672692.3077", post_code: "2007", year_sold: "2016" },
  { average_price: "1756333.3333", post_code: "2007", year_sold: "2017" },
  { average_price: "1538750.0000", post_code: "2007", year_sold: "2018" },
  { average_price: "1074166.6667", post_code: "2007", year_sold: "2019" },
  { average_price: "1523571.4286", post_code: "2007", year_sold: "2020" },
  { average_price: "1433333.3333", post_code: "2007", year_sold: "2021" },
  { average_price: "1618125.0000", post_code: "2007", year_sold: "2022" },
  { average_price: "1200350.1522", post_code: "2008", year_sold: "2014" },
  { average_price: "1390958.3438", post_code: "2008", year_sold: "2015" },
  { average_price: "1514414.2857", post_code: "2008", year_sold: "2016" },
  { average_price: "1787785.7143", post_code: "2008", year_sold: "2017" },
  { average_price: "1479026.3158", post_code: "2008", year_sold: "2018" },
  { average_price: "1473714.2857", post_code: "2008", year_sold: "2019" },
  { average_price: "1555475.2941", post_code: "2008", year_sold: "2020" },
  { average_price: "1784090.0000", post_code: "2008", year_sold: "2021" },
  { average_price: "1683322.1429", post_code: "2008", year_sold: "2022" },
  { average_price: "911188.9286", post_code: "2120", year_sold: "2014" },
  { average_price: "1160972.8538", post_code: "2120", year_sold: "2015" },
  { average_price: "1256910.1382", post_code: "2120", year_sold: "2016" },
  { average_price: "1424542.5169", post_code: "2120", year_sold: "2017" },
  { average_price: "1299376.1609", post_code: "2120", year_sold: "2018" },
  { average_price: "1191774.0805", post_code: "2120", year_sold: "2019" },
  { average_price: "1384677.3077", post_code: "2120", year_sold: "2020" },
  { average_price: "1732622.6239", post_code: "2120", year_sold: "2021" },
  { average_price: "1781319.5928", post_code: "2120", year_sold: "2022" },
  { average_price: "570560.9573", post_code: "2500", year_sold: "2014" },
  { average_price: "635000.3535", post_code: "2500", year_sold: "2015" },
  { average_price: "737290.7768", post_code: "2500", year_sold: "2016" },
  { average_price: "826410.8268", post_code: "2500", year_sold: "2017" },
  { average_price: "838164.2534", post_code: "2500", year_sold: "2018" },
  { average_price: "789850.5950", post_code: "2500", year_sold: "2019" },
  { average_price: "834058.2811", post_code: "2500", year_sold: "2020" },
  { average_price: "1038742.9599", post_code: "2500", year_sold: "2021" },
  { average_price: "1202154.9224", post_code: "2500", year_sold: "2022" },
  { average_price: "581293.4451", post_code: "2518", year_sold: "2014" },
  { average_price: "642468.5393", post_code: "2518", year_sold: "2015" },
  { average_price: "696098.5743", post_code: "2518", year_sold: "2016" },
  { average_price: "825659.7697", post_code: "2518", year_sold: "2017" },
  { average_price: "911004.4304", post_code: "2518", year_sold: "2018" },
  { average_price: "761260.9272", post_code: "2518", year_sold: "2019" },
  { average_price: "885447.8353", post_code: "2518", year_sold: "2020" },
  { average_price: "1160750.9010", post_code: "2518", year_sold: "2021" },
  { average_price: "1218527.1049", post_code: "2518", year_sold: "2022" },
];

export const post_code_legend = [
  ...new Set(data.map((item) => item.post_code)),
];

export const line_chart_series = data.reduce((acc, item) => {
  const { post_code, average_price } = item;

  const existingSeries = acc.find((series) => series.name === post_code);
  if (existingSeries) {
    existingSeries.data.push(parseFloat(average_price));
  } else {
    acc.push({
      name: post_code,
      type: "line",
      stack: "Total",
      data: [parseFloat(average_price)],
    });
  }

  return acc;
}, []);
