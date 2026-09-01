// Step 2 of the Decap CMS GitHub OAuth flow: exchange the code GitHub gave
// us for an access token, then hand that token back to the admin popup
// using the postMessage handshake Decap CMS expects.
module.exports = async (req, res) => {
  const { code, error, error_description } = req.query;

  if (error) {
    res.status(400).send(error_description || error);
    return;
  }
  if (!code) {
    res.status(400).send("Missing code");
    return;
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).send("Missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET environment variables.");
    return;
  }

  let tokenData;
  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    tokenData = await tokenRes.json();
  } catch (e) {
    res.status(502).send("Could not reach GitHub: " + e.message);
    return;
  }

  if (tokenData.error) {
    res.status(400).send(tokenData.error_description || tokenData.error);
    return;
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`<!DOCTYPE html>
<html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:' + ${JSON.stringify(payload)},
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`);
};
