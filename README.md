# Homebridge App Switch

This is a [Homebridge](https://github.com/nfarina/homebridge) plugin to control open and close applications with the flick of a (_virtual_) switch.

## Installation

This only works on macOS due to the use of `node-osascript` to turn the applications on & off.

1. `yarn global add homebridge-hermes-player`

2. Add the following to `~/.homebridge/config.json`:

```javascript
{
    // ...
    "accessories": [
        // ...
        {
            "accessory": "AppSwitch",
            "name": "VSC",
            // This is the actual name of the application shown in macOS
            "appName": "Visual Studio Code"
        }
    ]
}
```

The `name` can be whatever you want, but the `accessory` must be `"AppSwitch"`.
