# paperplane
:airplane: ridiculously simple &amp; free backend  for your web forms - http://flypaperplane.com

**Note:** This project is set to be deprecated soon and will be replaced with [Paperplane (Powered by JAWS)](https://github.com/eahefnawy/paperplane)

After you sign up and add your domains, just make a post request 
to our backend, and you're golden! You'll receive an email 
with the form data on every submission.

```javascript
$.ajax({
  type: "POST",
  url: "http://flypaperplane.com/api",
  data: { 
    // Example Form Data. Get it dynamically from user!
    email: "hello@example.com", 
    message: "Hello World"
  },
  success: function(response) {
    console.log(response);
  },
  dataType: "json"
});
```

## Be Creative
You can use paperplane for any type of web forms, from simple contact forms to long surveys. You can be even more creative and use it to deliver any type of data right to your mailbox, such as your users' activity on your website or items they want to order. Sky is the limit!
