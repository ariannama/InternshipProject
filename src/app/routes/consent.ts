// app.post("/callback", async (req, res) => {
//     let code = req.body.code;
//     res.send("ok");
//     const response: IExchangeCodeResponse = await request.post("https://auth.truelayer.com/connect/token", {
//         formData: {
//             grant_type: "authorization_code",
//             client_id: "test-eb3e42",
//             client_secret: TL_SECRET,
//             redirect_uri: "http://localhost:3001/callback.html",
//             code: code
//         },
//         resolveWithFullResponse: false,
//         json: true
//     });
//     let access_token = response.access_token;
//     let refresh_token = response.refresh_token;
//     let decoded = decoder<IDecodeToken>(access_token);
//     let subject = decoded.sub;
//     let query;
//     const selectParams = {
//         text: "SELECT FROM tokens WHERE subject = $1",
//         values: [subject]
//     };
//     try {
//         query = await client.query(selectParams);
//     } catch (e) {
//         console.log(e);
//     }
//     if (query != null) {
//         let deleteParams = {
//             text: "DELETE FROM tokens WHERE subject = $1",
//             values: [subject]
//         };
//         query = await client.query(deleteParams);
//     }
//     const queryParams = {
//         text: "INSERT INTO tokens(subject, access_token, refresh_token) VALUES($1, $2, $3)",
//         values: [subject, access_token, refresh_token]
//     };
//     try {
//         query = await client.query(queryParams);
//     } catch (e) {
//         console.log(e);
//     }
// });

