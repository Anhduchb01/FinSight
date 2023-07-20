const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();
const authService = require("../../service/admin/authentication/authenticationService");
const contactService = require("../../service/admin/contact/contactService");
//const {header , footer, container} = require("../../service/front-end/newsLetter/newsLetterService");
const newsletter = mongoose.model("Newsletter");
var dayjs = require("dayjs");
const schedule = require("node-schedule");

const Post = mongoose.model("Post");

async function getPostSendMailNewsLetter() {
  let postData = await Post.find({
    status: '0',
  }, (err, docs) => {
    if (!err) {
      return docs;
    } else {
      return false;
    }
  }).sort({ timeCrawlPage: -1 }).limit(4);
  return postData;
}


router.post("/post-newsletter", async (req, res) => {
  try {
    var Url = `${req.protocol}://${req.get("host")}`;
    var email = authService.Sanitizing(req.body.email);
    var Newsletter = new newsletter();
    let time = dayjs().format("YYYY/MM/DD HH:mm:ss");

    var emailSelect = await newsletter.find({ email: email });
    if (emailSelect.length !== 0) {
      return res.status(201).json({
        success: false,
        message: "This email is already registered",
      });
    } else {
      Newsletter.email = email;
      Newsletter.timeCreate = time;
      Newsletter.subscribe = true;
      Newsletter.save()
        .then((contact) => {
          sendMailNewsLetter(email, Url);
          return res.status(201).json({
            success: true,
            message: "Thank you",
          });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: error.message,
          });
        });
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});


async function getAllListMailNewsLetter() {
  try {
    let Data = await newsletter.find({}, (err, docs) => {
      if (!err) {
        return docs;
      } else {
        return false;
      }
    }).select('email')
    return Data;
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
}

const job = schedule.scheduleJob("0 0 12 * * 7", async function () {
  try {
    var Url = `https://waterportal.sinka.vn/`;
    const bccArray = await getAllListMailNewsLetter();
    const result = sendNewsLeeterByWeek(bccArray, Url);
    if (result) {
      console.log(' send successfully');
    } else {
      res.send('error')
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

async function sendNewsLeeterByWeek(bccemail = [], Url = '') {
  try {
    var contain = await setTextContainerSendMail(Url);
    var content = header.toString() + contain.toString() + footer.toString();
    var mainOptions = {
      from: "Water Portal",
      bcc: bccemail,
      subject: "Hi ! What's new this week ?",
      html: content,
    };
    const mail = await contactService.SendMail(mainOptions);
    return mail;
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
}

async function sendMailNewsLetter(email, Url) {
  try {
    var contain = await setTextContainerSendMail(Url);
    var content = header.toString() + contain.toString() + footer.toString();
    var mainOptions = {
      from: "Water Portal",
      to: email,
      subject: "Hi ! What's new this week ?",
      html: content,
    };
    const mail = await contactService.SendMail(mainOptions);
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
}

async function setTextContainerSendMail(url = '') {
  try {
    const array = await getPostSendMailNewsLetter();
    var containerText = '';
    for (let i = 0; i < array.length; i++) {
      containerText += `<div class="pc-sm-mw-100pc"
        style="display: inline-block; width: 100%;height:465px; max-width: 320px; vertical-align: top;
         padding: 18px 18px 18px;background-color: #F3F3F3;margin-top: 16px;margin-right: 6px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%"
          role="presentation">
          <tbody>
            <tr>
              <td valign="top" align="center">
                <img
                  src="${array[i].urlimage}"
                  width="360" height="400" alt=""
                  style="height: 193px;border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; display: block; color: #151515; max-width: 100%; Margin: 0 auto;">
              </td>
            </tr>
            <tr>
              <td height="12" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
            </tr>
          </tbody>
  
          <tbody>
            <td class="block-ellipsis">
              <h3 style="margin:0;padding:0;font-family:'Segoe UI Semibold','Segoe UI',SUWSB,Arial,sans-serif;
              font-size:26px;line-height:34px;color:#000000;text-align:left;letter-spacing:-0.01em;font-weight:normal;
              display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;
              height: 72px;">
                ${array[i].title}
              </h3>
  
            </td>
          </tbody>
          <tr>
            <td height="5" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
          </tr>
          <tbody>
            <tr>
              <td class="block-ellipsis-des">
                <p style="margin:0;padding:0;font-family:'Segoe UI','Segoe UI Regular',SUWR,Arial,sans-serif;font-size:16px;line-height:24px;color:#000000;text-align:left;letter-spacing:0.0em;
                text-align: justify;display: -webkit-box;-webkit-line-clamp: 6;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;
            height: 148px;text-indent: 19px;text-align: justify;">
            ${array[i].description}
                </p>
              </td>
            </tr>
            <tr>
              <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
            </tr>
          </tbody>
  
          <tbody>
            <tr>
              <td valign="top" align="center" style="padding: 5px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0"
                  role="presentation" style="border-collapse: separate;">
                  <tbody>
                    <tr>
                      <td valign="top" align="center"
                        style="border-radius: 14px; border: 1px solid #CDCED2; padding: 6px 9px;background-color: #00ffe76b;">
                        <table border="0" cellpadding="0" cellspacing="0"
                          role="presentation">
                          <tbody>
                            <tr>
                              <td valign="middle">
                                <a class="pc-fb-font"
                                  href="${url}/detail-new/${array[i]._id}"
                                  style="text-decoration: none; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; display: block; font-size: 14px; font-weight: 500; color: #4B4B4B; line-height: 14px; white-space: nowrap;"><span>Read
                                    more</span>
                                </a>
                              </td>
                              <td valign="middle" align="left"
                                style="vertical-align:middle;line-height:24px;padding-left:10px;padding-right:5px">
                                <img border="0" alt=""
                                  src="https://ci5.googleusercontent.com/proxy/3MubbEmI4emeyU_R3wI2UVbZ6CCMlPLOv5ALe8V05d0Dr8WHhMduNkM0n4AbTHLD2Vz-pyhiLnVpGf6MIZ9Px2Q4d-3n6Z5zFNV7LZlHFFf9H6bJhxDivswPNOtiCJhqpMw=s0-d-e1-ft#http://image.email2.office.com/lib/fe8d137276630c7f70/m/1/Caret_purple_left.png"
                                  width="4"
                                  style="display:block;outline:none;border:none"
                                  class="CToWUd"></a>
                              </td>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>`
    }
    return containerText;
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }

}



var header = `<body
style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4"
class="">
<table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0"
  role="presentation" style="table-layout: fixed;">
  <tbody>
    <tr>
      <td class="pc-email-body-inner" align="center" valign="top">
        <table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
          role="presentation" style="margin: 0 auto; max-width: 778px;">
          <tbody>
            <tr>
              <td align="left" valign="top" style="padding: 0 10px;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tbody>
                    <tr>
                      <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tbody>
                    <tr>
                      <td valign="top">
                        <!-- BEGIN MODULE: Menu 1 -->
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tbody>
                            <tr>
                              <td class="pc-sm-p-20 pc-xs-p-10" bgcolor="#1B1B1B" valign="top"
                                style="padding: 25px 30px; background-color: #1B1B1B">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tbody>
                                    <tr>
                                      <td valign="top" style="padding: 10px;">
                                        <a href="https://waterportal.sinka.vn/" style="text-decoration: none;">
                                          <h3 class="heading__title" style="color: white;
                                          box-sizing: inherit;
                                          margin-top: 0;
                                          font-weight: 700;
                                          letter-spacing: -.030em;
                                          font-size: 32px;
                                          line-height: 40px;
                                          margin-bottom: 0;
                                          z-index: 1;
                                          position: relative;top: -9px;">
                                            WATER <span class="color--green" style="color:#00997d;">
                                              PORTAL
                                            </span>
                                          </h3>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                          <tbody>
                                            <tr>
                                              <td valign="top"
                                                style="padding: 10px; line-height: 18px; font-family: Helvetica, sans-serif; font-size: 14px;">
                                                <a href="https://waterportal.sinka.vn/"
                                                  style="text-decoration: none; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #ffffff;">Home</a>
                                                <span
                                                  style="font-family: Helvetica, sans-serif; font-size: 20px;">&nbsp;&nbsp;</span>
                                                <a href="https://waterportal.sinka.vn/news/"
                                                  style="text-decoration: none; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #ffffff;">News</a>
                                                <span
                                                  style="font-family: Helvetica, sans-serif; font-size: 20px;">&nbsp;&nbsp;</span>
                                                <a href="https://waterportal.sinka.vn/keyword-analytics/?key=&page=1&geo=&time=now%201-H&gprop="
                                                  style="text-decoration: none; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #ffffff;">Keyword
                                                  Analysis
                                                </a>
                                                <span
                                                  style="font-family: Helvetica, sans-serif; font-size: 20px;">&nbsp;&nbsp;</span>
                                                <a href="https://waterportal.sinka.vn/contacts/"
                                                  style="text-decoration: none; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #ffffff;">Contact</a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td valign="top">
                                        <table align="right" border="0" cellpadding="0" cellspacing="0"
                                          role="presentation">
                                          <tbody>
                                            <tr>
                                              <td valign="middle" style="padding: 10px;">
                                                <a href="http://example.com" style="text-decoration: none;"><img
                                                    src="https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-256.png"
                                                    width="15" height="15" alt=""
                                                    style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                              </td>
                                              <td valign="middle" style="padding: 10px;">
                                                <a href="http://example.com" style="text-decoration: none;"><img
                                                    src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-256.png"
                                                    width="16" height="14" alt=""
                                                    style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                              </td>
                                              <td valign="middle" style="padding: 10px;">
                                                <a href="http://example.com" style="text-decoration: none;"><img
                                                    src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-256.png"
                                                    width="16" height="15" alt=""
                                                    style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- END MODULE: Menu 1 -->
                        <!-- BEGIN MODULE: Content 2 -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                          <tbody>
                            <tr>
                              <td class="pc-sm-p-25-10-15 pc-xs-p-15-0-5" valign="top" bgcolor="#ffffff"
                                style="padding: 16px 16px 16px; background-color: #ffffff">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                  <tbody>
                                    <h4 class="heading__title" style="
                                    text-align: center;
                                    box-sizing: inherit;
                                    font-weight: 700;
                                    letter-spacing: -.030em;
                                    font-size: 29px;
                                    line-height: 40px;
                                    margin : 0 0 5px;
                                    z-index: 1;
                                    position: relative;top: -9px;">
                                    Featured <span class="color--green" style="color:#00997d;">
                                      News
                                    </span>
                                  </h4>                                  
                                  </tbody>
                                  <td bgcolor="#F3F3F3" style="" class="m_1185040445403024112mobile-side-padding-20">
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                      <tbody>
                                        <tr>
                                          <td height="1" bgcolor="#8661C5"
                                            style="line-height:1px;font-size:1px;padding-top:0px;padding-bottom:0px;padding-left:px;padding-right:px"
                                            class="m_1185040445403024112mobile-side-padding-10">?</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <tbody>
                                    <tr>
                                      <td style="font-size: 0;" valign="top">`

var footer = `</td>
</tr>
</tbody>
</table>

</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
<tbody>
<tr>
<td class="pc-sm-p-21-10-14 pc-xs-p-5-0"
style="padding: 21px 20px 14px 20px; background-color: #1B1B1B" valign="top" bgcolor="#1B1B1B"
role="presentation">
<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
<tbody>
<tr>
<td style="font-size: 0;" valign="top">
<!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="280" valign="top"><![endif]-->
<div class="pc-sm-mw-100pc"
style="display: inline-block; width: 100%; max-width: 350px; vertical-align: top;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
<tbody>
  <tr>
    <td style="padding: 20px;" valign="top">
      <table border="0" cellpadding="0" cellspacing="0" width="100%"
        role="presentation">
        <tbody>
          <tr>
            <td class="pc-fb-font"
              style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight:500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;"
              valign="top">
              Follow Us.
            </td>
          </tr>
          <tr>
            <td height="11" style="line-height: 1px; font-size: 1px;">
              &nbsp;</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td class="pc-fb-font"
              style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height:20px; letter-spacing: -0.2px; color: #D8D8D8;"
              valign="top">
              We are always looking for new exciting projects and
              collaborations. Feel free to contact us.
            </td>
          </tr>
          <tr>
            <td class="pc-sm-h-20" height="56"
              style="line-height: 1px; font-size: 1px;">&nbsp;</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td style="font-family: Arial, sans-serif; font-size: 19px;"
              valign="top">
              <a href="http://example.com" style="text-decoration: none;"><img
                  src="https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-256.png"
                  width="20" height="20" alt=""
                  style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
              <span>&nbsp;&nbsp;</span>
              <a href="http://example.com" style="text-decoration: none;"><img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-256.png"
                  width="21" height="18" alt=""
                  style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
              <span>&nbsp;&nbsp;</span>
              <a href="http://example.com" style="text-decoration: none;"><img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-256.png"
                  width="21" height="20" alt=""
                  style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
              <span>&nbsp;&nbsp;</span>
              <a href="http://example.com" style="text-decoration: none;"><img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Pinterest_colored_svg-256.png"
                  width="20" height="20" alt=""
                  style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table>
</div>
<!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
<div class="pc-sm-mw-100pc"
style=" display: inline-block; width: 100%; max-width: 350px; vertical-align: top;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
<tbody>
  <tr>
    <td style="padding: 20px;" valign="top">
      <table border="0" cellpadding="0" cellspacing="0" width="100%"
        role="presentation">
        <tbody>
          <tr>
            <td class="pc-fb-font"
              style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight:500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;"
              valign="top">
              Contact us.
            </td>
          </tr>
          <tr>
            <td height="11" style="line-height: 1px; font-size: 1px;">
              &nbsp;</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td class="pc-fb-font"
              style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height:20px; letter-spacing: -0.2px; color: #D8D8D8;"
              valign="top">
              <span>Kamikoshien street, 2</span>901 Marm<span>ara road, Tokyo,
                WA 981</span>22-1090
            </td>
          </tr>
          <tr>
            <td class="pc-sm-h-20" height="45"
              style="line-height: 1px; font-size: 1px;">&nbsp;</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td class="pc-fb-font"
              style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight:500; line-height: 24px; letter-spacing: -0.2px;"
              valign="top">
              <a href="tel:749-977-3440"
                style="text-decoration: none; color: #ffffff;">749-977-3440</a>
            </td>
          </tr>
          <tr>
            <td height="9" style="line-height: 1px; font-size: 1px;">
              &nbsp;</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td class="pc-fb-font"
              style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight:500; line-height: 24px;"
              valign="top">
              <a href="mailto:bo.grady@nathen.biz"
                style="text-decoration: none; color: #1595E7;">sinkavietnam@gmail.com</a>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table>
</div>
<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!-- END MODULE: Footer 1 -->
</td>
</tr>
</tbody>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
<tbody>
<tr>
<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
</td>
</tr>
</tbody>
</table>
</body>`

module.exports = router;