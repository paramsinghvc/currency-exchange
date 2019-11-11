import { xml2js } from "xml-js";

export const fetchExchangeRateData = async () => {
  const xmlResponse = await fetch(
    "https://cors-anywhere.herokuapp.com/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
  );
  const xmlText = await xmlResponse.text();
  const jsData = xml2js(xmlText, {
    compact: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreComment: true,
    ignoreCdata: true,
    ignoreDoctype: true,
    ignoreText: true
  });
  debugger;
};
