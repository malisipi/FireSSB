# Comparison Chart

| Features                                | FireSSB | PWAsForFirefox |
|-----------------------------------------|-----------|----------------|
| Extension support                       | Yes       | Yes(1)         |
| Same profile support                    | Yes       | No             |
| Undepency to external apps              | Yes       | No             |
| Manage apps from command line           | Yes(2)    | Yes            |
| Target="_blank" links will open browser | Yes       | No(3)          |
| All websites is supported               | Yes       | Yes            |
| Isolation support                       | Yes       | Yes            |
| Future-proof                            | Yes(4)    | No(4)          |
| App Scope                               | No        | Yes            |
| Protocol Handlers                       | No        | Yes            |
| Works with forks of Firefox             | Yes       | Maybe(5)       |
| Auto-creation of Desktop Entry support  | Partial(6)| Yes            |

> If something is wrong or changed about this table, please open a issue. 

> PWAsForFirefox extension has more integration with system, however their native executable (runtime) dependency and their workarounds is increasing the possibility of profile/extension corruption. FireSSB is using standarts of WebExtension, so it will be more stable.

> 1: Required to installed each PWA profile and configure the extensions

> 2: As a difference from PWAsForFirefox, FireSSB haven't a installing/removing process. Just create/remove an/the shortcut.

> 3: Not supported [PWAsForFirefox#354](https://github.com/filips123/PWAsForFirefox/issues/354)

> 4: FireSSB is not depended to a native depency or some quirks. All APIs that used by FireSSB is documentated in WebExtension Specification. So it can be ported easily any browser that supports WebExtension.
> 
>    PWAsForFirefox is heavily depended browser behaviour and native depency. [PWAsForFirefox#475](https://github.com/filips123/PWAsForFirefox/issues/475)

> 5: Firefox forks can be require some workaround [PWAsForFirefox#357](https://github.com/filips123/PWAsForFirefox/issues/357)

> 6: Desktop Entries can be created by clicking "Create Desktop File" on Linux. (Will not add to application list due to lack of FileSystem permissions of extensions.). No support for other OSs yet.
