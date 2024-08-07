import mail from '@sendgrid/mail'
import { SG_APIKEY } from '../constants/envs'

mail.setApiKey(SG_APIKEY as string)

export default mail
