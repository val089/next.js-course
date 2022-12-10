import { NextApiHandler } from 'next';
import { StripeWebhookEvents } from '../../stripeEvents';

const stripeWebhook: NextApiHandler = (req, res) => {
  //@todo verify signing secret
  console.log(req.body);

  const event = req.body as StripeWebhookEvents;

  if (event.type === 'checkout.session.completed') {
    event.data.object.success_url;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      event.data.object.id;
      //@todo zaktualizuj zamówienie w GraphCMS
      return;
  }

  res.status(204).end();
};

export default stripeWebhook;
