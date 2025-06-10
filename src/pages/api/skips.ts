import type { NextApiRequest, NextApiResponse } from "next";
import { readJsonFile } from "@/lib/jsonUtils";
import { SkipType } from "@/index";

const skips = readJsonFile('skips');

// Set CORS headers
const allowCors = (res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    allowCors(res);
    return res.status(200).end();
  }
  
  // Set CORS headers for all responses
  allowCors(res);
  const { method, query } = req;

  switch (method) {
    case 'GET':
      console.log("Fetching skips data")
      try {
        const { size, limit } = query;
        let filteredSkips = skips;

        if (size) {
          filteredSkips = skips.filter((skip: SkipType) => skip.size === parseInt(size as string));
        }

        if (limit) {
          filteredSkips = filteredSkips.slice(0, parseInt(limit as string));
        }

        res.status(200).json(filteredSkips);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: `Failed to fetch users: ${error}`
        });
      }
      break;

    case 'POST':
      res.status(200).json({
        success: true,
        message: 'We are not creating skips yet'
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        success: false,
        error: `Method ${method} Not Allowed`
      });
  }
}