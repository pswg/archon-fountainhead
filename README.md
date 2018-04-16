# Archon Fountainhead
_Fountainhead_ 
    n. A spring that is the source or head of a stream.

## Troubleshooting
You can run your own copy of this application for developing and testing
proposed changes to application.

 1. [Fork][1] this repo.

 2. Clone your fork to work locally.

        git clone https://github.com/<USERNAME>/archon-fountainhead

 3. *(optional)* Set up a GitHub API proxy for automatic authentication.

    For security reasons, the archon doesn't store or use any authentication
    information to access the GitHub API. Unfortunately this means that it's 
    abiliy access the API is quite limited when calling the API directly. To 
    work around this, the archon is designed to pass all API requests through
    a proxy that handles authenticating the archon to the GitHub server. 

    Setting up the proxy for local testing can be a bit cumbersome, and is not
    strictly necessary for _most_ functions in the archon.

 4. *(optional)* Add an SHA key to the environment.

    The archon constantly checks the current hash of the `master` branch in 
    GitHub to ensure that it's 'up to date'. However, for local testing, is not 
    _usually_ necessary, and so it is only performed if the `SHA` environment
    variable is set. 
    
    If you need to test the server's 'out of date' behavior, you'll need need to
    grab the SHA of the current commit from `git` or GitHub, and create an 
    environment variable named `SHA` with that value in your IDE for testing.

 5. Try it out for yourself http://localhost:3000/

 [1]: https://help.github.com/articles/fork-a-repo/

