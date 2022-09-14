// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';

// console.log({ test: process.env.MAILERLITE_GROUP_ID });

const handler: NextApiHandler = async (req, res) => {
  // res.status(200).json({ name: 'John Doe' });

  // informujemy użytkownika jeśli wykona inną metodę niż POST
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).json({});
  }
  // res.status(200).json({ body: req.body });

  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    return res
      .status(500)
      .json({ error: `Nie podano zmiennych środowiskowych` });
  }

  const email = req.body.email;

  if (typeof email !== 'string') {
    return res.status(400).json({});
  }

  const mailerLiteResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-MailerLite-ApiDocs': 'true',
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
      },
      body: JSON.stringify({ email }),
    }
  );
  if (!mailerLiteResponse.ok) {
    return res.status(500).json({
      error: 'Pojawił się problem przy zapisie do Newslettera',
    });
  }

  // const json = await mailerLiteResponse.json();

  return res.status(201).json({});
};

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' });
// }

export default handler;

// fetch('http://localhost:3000/api/hello', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ email: 'dupa@dupa.pl' }),
// });
