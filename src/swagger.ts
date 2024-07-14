export default {
    swagger: "2.0",
    info: {
      title: "Wallet Points API",
      version: "1.0.0",
    },
    basePath: "/api/v1",
    paths: {
      "/points": {
        get: {
          summary: "Get total points for a wallet address between dates",
          parameters: [
            {
              name: "wallet_address",
              in: "query",
              required: true,
              type: "string",
            },
            {
              name: "from_date",
              in: "query",
              required: true,
              type: "string",
              format: "date",
            },
            {
              name: "to_date",
              in: "query",
              required: true,
              type: "string",
              format: "date",
            },
          ],
          responses: {
            200: {
              description: "Success",
              schema: {
                type: "object",
                properties: {
                  wallet_address: {
                    type: "string",
                  },
                  from_date: {
                    type: "string",
                    format: "date",
                  },
                  to_date: {
                    type: "string",
                    format: "date",
                  },
                  total_points: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  