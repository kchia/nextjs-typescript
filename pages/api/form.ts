// You can access this API endpoint at http://localhost:3000/api/form

// HTML
// <form action="/api/form" method="post">
//   <label for="first">First name:</label>
//   <input type="text" id="first" name="first" />
//   <label for="last">Last name:</label>
//   <input type="text" id="last" name="last" />
//   <button type="submit">Submit</button>
// </form>

export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log("body: ", body);

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.first || !body.last) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "First or last name not found" });
  }

  // Moreover, you can also attach this API to a database like MongoDB or Google Sheets.
  // This way, your submitted form data will be securely stored for later use.

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.first} ${body.last}` });
}
