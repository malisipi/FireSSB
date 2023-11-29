# Comparison Chart

| Features                                | FireSSB | FirefoxPWA |
|-----------------------------------------|---------|------------|
| Extension support                       | Yes     | Yes(1)     |
| Same profile support                    | Yes     | No         |
| Undepency to external apps              | Yes     | No         |
| Manage apps from command line           | Yes(2)  | Yes        |
| Target="_blank" links will open browser | Yes     | No(3)      |
| All websites is supported               | Yes     | Yes        |
| Isolation support                       | Yes     | Yes        |
| App Scope                               | No      | Yes        |
| Protocol Handlers                       | No      | Yes        |
| Works with forks of Firefox             | Yes     | Maybe(4)   |

> If something is wrong or changed about this table, please open a issue. 

> FirefoxPWA extension has more integration with system, however their native executable (runtime) dependency and their workarounds is increasing the possibility of profile/extension corruption. FireSSB is using standarts of WebExtension, so it will be more stable.

> 1: Required to installed each PWA profile and configure the extensions

> 2: As a difference from FirefoxPWA, FireSSB haven't a installing/removing process. Just create/remove an/the shortcut.

> 3: Not supported [PWAsForFirefox#354](https://github.com/filips123/PWAsForFirefox/issues/354)

> 4: Firefox forks can be require some workaround [PWAsForFirefox#357](https://github.com/filips123/PWAsForFirefox/issues/357)