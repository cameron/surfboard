# Surfboard

_Super duper alpha_ keyboard web surfing for Chorme.


# Install from Chrome Store

Surfboard will be listed in the Chrome store when it's less half-baked.


# Install from Source

- Clone the repo
- Run `gulp build` in the project directory
- Open Chrome to 'chrome://extensions'
- Click 'Load Unpacked Extension'
- Select the `app` directory


# Surf

- Load any webpage
- Find a link with your eyes
- Press the key of the link text's first letter
  - If that link is the only one that starts with that letter, it will be clicked. You're surfing!
  - If there are multiple such links, the first letter of each will be replaced with a unique letter.
    - Pressing the key of your link's new first letter will click the link
- Pressing `Esc` will bail out of any link selection process
