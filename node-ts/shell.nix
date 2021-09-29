with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "node";
    buildInputs = [
        nodejs-12_x
        yarn
        nodePackages.typescript
    ];
    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
        fish --init-command="function fish_greeting; echo 'Entered NodeJS Environment'; end; function fish_prompt; echo 'NodeJS 🐟> '; end; npm run build"
        echo "Leaving NodeJS Environment"
        exit
    '';
}



