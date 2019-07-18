function getElementByXPath(xpath) {
  return new XPathEvaluator()
    .createExpression(xpath)
    .evaluate(document, XPathResult.FIRST_ORDERED_NODE_TYPE)
    .singleNodeValue
}

getElementByXPath("//mat-datepicker-toggle//button[@class='mat-icon-button']").click();