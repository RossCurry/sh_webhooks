import moment from 'moment';
import crypto from 'node:crypto';
import { config } from '../utils/staticConfig.js';
class InvalidSignature extends Error {
}
export default function verifySignature(req, res, next) {
    console.log('call verifySignature');
    const { 'x-socialhub-timestamp': reqTimestamp, 'x-socialhub-signature': reqSignature, } = req.headers;
    if (!reqTimestamp || !reqSignature) {
        throw new InvalidSignature('SocialHub headers missing from request');
    }
    if (moment().diff(Number(reqTimestamp), 'minutes', true) > 5) {
        throw new InvalidSignature('Request timestamp is not valid');
    }
    const challenge = crypto.createHash('sha256').update(`${reqTimestamp};${config.socialHub.manifestSecret}`).digest('hex');
    const hmac = crypto.createHmac('sha256', challenge);
    if (req.body) {
        const payload = JSON.stringify(req.body);
        hmac.update(payload);
    }
    const expectedSignature = hmac.digest('hex');
    if (reqSignature !== expectedSignature) {
        throw new InvalidSignature('Request signature is not valid');
    }
    res.set('x-socialhub-challenge', challenge);
    next();
}
;
//# sourceMappingURL=verify.js.map