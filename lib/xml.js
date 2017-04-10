function parse(str) {

}

function stringify({
  signName,
  templateCode,
  type = 'singleContent',
  receiver,
  params
}) {

  const data = {
    FreeSignName: signName,
    TemplateCode: templateCode,
    Type: type,
    Receiver: receiver,
    SmsParams: JSON.stringify(params)
  };

  return `<?xml version="1.0" encoding="UTF-8"?>`
    + `<Message xmlns="http://mns.aliyuncs.com/doc/v1">`
      + `<MessageBody>code</MessageBody>` 
      + `<MessageAttributes>` 
        + `<DirectSMS>${JSON.stringify(data)}</DirectSMS>` 
      + `</MessageAttributes>` 
    + `</Message>`;

}

module.exports = { parse, stringify };
