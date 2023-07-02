const ejs = require('ejs')
const sendgrid = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs');

module.exports = async (to = [], subject = '', headers = [], data = {}, template = '') => {

    try {

        sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

        const mailTemplate = path.join(__dirname, '..', 'mail', template);
        if (template.trim() == '' ) throw Error('Template file needs to be set');
        if (!fs.existsSync(mailTemplate)) throw Error(`Template file '${mailTemplate}' not found`)
        const html = await ejs.renderFile(mailTemplate, data);

        const message = {
            to: to,
            from: process.env.EMAIL_FROM,
            subject: subject,
            html: html
        };
        console.log(message);
        const response = await sendgrid.send(message);
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
    

}