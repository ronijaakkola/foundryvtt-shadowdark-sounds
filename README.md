<h1 align="left">Shadowdark Sounds for FoundryVTT</h1>
<p align="left">
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fronijaakkola%2Ffoundryvtt-shadowdark-sounds%2Fmain%2Fmodule.json&query=%24.compatibility.verified&logo=foundryvirtualtabletop&logoColor=white&label=Foundry%20version&labelColor=%23FE6A1F&color=black" />
  <a href="https://foundryvtt.com/packages/shadowdark"><img src="https://img.shields.io/badge/system-shadowdark-black?labelColor=white" /></a>
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fronijaakkola%2Ffoundryvtt-shadowdark-sounds%2Fmain%2Fmodule.json&query=%24.version&logoColor=white&label=version&labelColor=white&color=black" />
</p>

<p><a href="https://ko-fi.com/ronihelppi"><img src="https://github.com/user-attachments/assets/0a7e973f-15af-40ce-803c-1734f5bc7d7c" width="161" alt="Buy Me a Torch Button" /></a></p>

<p align="left"><i>This module enables playing sounds based on various triggers in the Shadowdark FoundryVTT system.</i></p>

## Installation
During the beta, this module is only available via a manual install. To install, go to the Foundry admin panel, browse to Add-On Modules and paste the following manifest URL: 

<code>https://github.com/ronijaakkola/foundryvtt-shadowdark-sounds/releases/latest/download/module.json</code>

**Note! The module requires [libWrapper](https://foundryvtt.com/packages/lib-wrapper) to be installed!**

## Features
- **Sounds**: Play sound effects triggered from various Shadowdark events (see Triggers for more information)
- **Ready to use**: Includes curated, high-quality sound effects (that are free to use!)
- **Make it yours**: Full control over sound effects
  - Enable/disable each trigger separately
  - Override any effect with your custom sound file
  - Control volume separately for each sound effect

## Triggers
Currently supported triggers for sound effects are:

### Light Source
- **Ignite** - _Plays when a character ignites a light source_
- **Douse** - _Plays when a character douses a light source_
- **Drop** - _Plays when a character drops a light source on the ground_
- **Pickup** - _Plays when a character picks up a light source from the ground_
- **Expire** - _Plays when a light source expires_
- **Last light expire** - _Plays when the last light source expires_

## Contributing
This module is in its beta stage. All kinds of contributions are warmly welcome. You can contribute in various ways:

- Report bugs
- Suggest features (new triggers etc.)
- Curate and suggest high-quality sound effects (need to be commercially free to use and edit)
- Translate this module to a language you speak
- Contribute to implementation

## Attributions
This module uses modified commercially free sound effects. See the full list of sounds, their authors and licences [here](https://github.com/ronijaakkola/foundryvtt-shadowdark-sounds/tree/main/assets/sounds).
