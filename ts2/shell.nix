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
        fish --init-command="function fish_greeting; echo 'Entered NodeJS Environment'; end; function fish_prompt; echo -n 'NodeJS '; set_color green; echo -n (prompt_pwd); set_color normal ; echo -n ' 🐟> '; end"
        echo "Leaving NodeJS Environment"
        exit
    '';
}



