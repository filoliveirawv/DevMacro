# DevMacro

The RunMacro is a simple but powerful component that allows you to generate a "macro".
This macro is intended to click around things on screen to get you from point A to point Z fast.

This is usual if you are developing something that requires you to click a lot of things before getting to the screen you are working on.

The scripts included make it easy for you to add and remove the Macro button to TopNav.jsx

The scripts assume you have `Code/workvivo` in your home directory. If not, you will have to update the locations manually.

## Files

- `AddMacro.js`: Script to add a macro.
- `RemoveMacro.js`: Script to remove a macro.
- `RunMacro.jsx`: The Macro button component.

## Usage

1. **Add a Macro**
   - Run `node AddMacro.js` to add the button to TopNav
2. **Remove a Macro**
   - Run `node RemoveMacro.js` to revert the changes to TopNav

Every time you run AddMacro it overrides the previous version.

Change the RunMacro.jsx code to update your macro.
