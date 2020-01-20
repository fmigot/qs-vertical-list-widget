SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "vertical-list-widget/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.24.1",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.23"
    },
    "packages": {
      "npm:babel-plugin-transform-react-jsx@6.24.1": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.26.0",
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.26.0"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.26.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.26.0",
          "esutils": "npm:esutils@2.0.3",
          "babel-types": "npm:babel-types@6.26.0"
        }
      },
      "npm:babel-types@6.26.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.26.0",
          "esutils": "npm:esutils@2.0.3",
          "lodash": "npm:lodash@4.17.15",
          "to-fast-properties": "npm:to-fast-properties@1.0.3"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "vertical-list-widget": {
      "main": "index.js",
      "format": "esm",
      "meta": {
        "*.js": {
          "loader": "plugin-babel",
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-react-jsx"
            ]
          }
        },
        "*.scss": {
          "loader": "sass"
        },
        "*.sass": {
          "loader": "sass"
        }
      }
    }
  },
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fast-deep-equal": "npm:fast-deep-equal@3.1.1",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "material-ui": "npm:material-ui@0.20.0",
    "moment": "npm:moment@2.19.2",
    "moment-jdateformatparser": "npm:moment-jdateformatparser@1.2.1",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "prop-types": "npm:prop-types@15.7.2",
    "react": "npm:react@15.6.2",
    "react-dom": "npm:react-dom@15.6.2",
    "react-tooltip": "npm:react-tooltip@3.11.2",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.2",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:react-dom@15.6.2": {
      "map": {
        "prop-types": "npm:prop-types@15.7.2",
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.17"
      }
    },
    "npm:material-ui@0.20.0": {
      "map": {
        "prop-types": "npm:prop-types@15.7.2",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "inline-style-prefixer": "npm:inline-style-prefixer@3.0.8",
        "recompose": "npm:recompose@0.26.0",
        "simple-assign": "npm:simple-assign@0.1.0",
        "react-event-listener": "npm:react-event-listener@0.5.10",
        "react-transition-group": "npm:react-transition-group@1.2.1",
        "keycode": "npm:keycode@2.2.0",
        "warning": "npm:warning@3.0.0",
        "lodash.merge": "npm:lodash.merge@4.6.2",
        "lodash.throttle": "npm:lodash.throttle@4.1.1"
      }
    },
    "npm:react-tooltip@3.11.2": {
      "map": {
        "prop-types": "npm:prop-types@15.7.2",
        "classnames": "npm:classnames@2.2.6"
      }
    },
    "npm:react@15.6.2": {
      "map": {
        "prop-types": "npm:prop-types@15.7.2",
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.17",
        "create-react-class": "npm:create-react-class@15.6.3"
      }
    },
    "npm:prop-types@15.7.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1",
        "react-is": "npm:react-is@16.12.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.4.3"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.2.0"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.8.3"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.2": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.12.0"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.2"
      }
    },
    "npm:react-event-listener@0.5.10": {
      "map": {
        "prop-types": "npm:prop-types@15.7.2",
        "fbjs": "npm:fbjs@0.8.17",
        "warning": "npm:warning@3.0.0",
        "@babel/runtime": "npm:@babel/runtime@7.0.0-beta.42"
      }
    },
    "npm:fbjs@0.8.17": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "promise": "npm:promise@7.3.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.21",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "core-js": "npm:core-js@1.2.7"
      }
    },
    "npm:recompose@0.26.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.17",
        "symbol-observable": "npm:symbol-observable@1.2.0",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
        "change-emitter": "npm:change-emitter@0.1.6"
      }
    },
    "npm:react-transition-group@1.2.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "prop-types": "npm:prop-types@15.7.2",
        "warning": "npm:warning@3.0.0",
        "chain-function": "npm:chain-function@1.0.1",
        "dom-helpers": "npm:dom-helpers@3.4.0"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:loose-envify@1.4.0": {
      "map": {
        "js-tokens": "npm:js-tokens@4.0.0"
      }
    },
    "npm:create-react-class@15.6.3": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.17"
      }
    },
    "npm:babel-runtime@6.26.0": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.11.1",
        "core-js": "npm:core-js@2.6.11"
      }
    },
    "npm:@babel/runtime@7.0.0-beta.42": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.11.1",
        "core-js": "npm:core-js@2.6.11"
      }
    },
    "npm:stream-http@2.8.3": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.7",
        "inherits": "npm:inherits@2.0.4",
        "xtend": "npm:xtend@4.0.2",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.7",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:stream-browserify@2.0.2": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.7",
        "inherits": "npm:inherits@2.0.4"
      }
    },
    "npm:inline-style-prefixer@3.0.8": {
      "map": {
        "bowser": "npm:bowser@1.9.4",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.1"
      }
    },
    "npm:crypto-browserify@3.12.0": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.1",
        "public-encrypt": "npm:public-encrypt@4.0.3",
        "create-ecdh": "npm:create-ecdh@4.0.3",
        "create-hmac": "npm:create-hmac@1.1.7",
        "randombytes": "npm:randombytes@2.1.0",
        "pbkdf2": "npm:pbkdf2@3.0.17",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "create-hash": "npm:create-hash@1.2.0",
        "randomfill": "npm:randomfill@1.0.4"
      }
    },
    "npm:buffer@5.4.3": {
      "map": {
        "base64-js": "npm:base64-js@1.3.1",
        "ieee754": "npm:ieee754@1.1.13"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:readable-stream@2.3.7": {
      "map": {
        "string_decoder": "npm:string_decoder@1.1.1",
        "inherits": "npm:inherits@2.0.4",
        "core-util-is": "npm:core-util-is@1.0.2",
        "isarray": "npm:isarray@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@2.0.1",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:diffie-hellman@5.0.3": {
      "map": {
        "randombytes": "npm:randombytes@2.1.0",
        "bn.js": "npm:bn.js@4.11.8",
        "miller-rabin": "npm:miller-rabin@4.0.1"
      }
    },
    "npm:pbkdf2@3.0.17": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "sha.js": "npm:sha.js@2.4.11",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "ripemd160": "npm:ripemd160@2.0.2"
      }
    },
    "npm:dom-helpers@3.4.0": {
      "map": {
        "@babel/runtime": "npm:@babel/runtime@7.8.3"
      }
    },
    "npm:public-encrypt@4.0.3": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "randombytes": "npm:randombytes@2.1.0",
        "parse-asn1": "npm:parse-asn1@5.1.5",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1"
      }
    },
    "npm:create-hmac@1.1.7": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.4",
        "sha.js": "npm:sha.js@2.4.11",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "ripemd160": "npm:ripemd160@2.0.2",
        "cipher-base": "npm:cipher-base@1.0.4"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "randombytes": "npm:randombytes@2.1.0",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "inherits": "npm:inherits@2.0.4",
        "parse-asn1": "npm:parse-asn1@5.1.5",
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.5.2",
        "browserify-rsa": "npm:browserify-rsa@4.0.1"
      }
    },
    "npm:create-hash@1.2.0": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "sha.js": "npm:sha.js@2.4.11",
        "ripemd160": "npm:ripemd160@2.0.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "md5.js": "npm:md5.js@1.3.5"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.7.3",
        "whatwg-fetch": "npm:whatwg-fetch@3.0.0"
      }
    },
    "npm:randombytes@2.1.0": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:browserify-cipher@1.0.1": {
      "map": {
        "browserify-des": "npm:browserify-des@1.0.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "browserify-aes": "npm:browserify-aes@1.2.0"
      }
    },
    "npm:create-ecdh@4.0.3": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.5.2"
      }
    },
    "npm:css-in-js-utils@2.0.1": {
      "map": {
        "isobject": "npm:isobject@3.0.1",
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.3"
      }
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:string_decoder@1.1.1": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:@babel/runtime@7.8.3": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.13.3"
      }
    },
    "npm:sha.js@2.4.11": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:ripemd160@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:parse-asn1@5.1.5": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.17",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:browserify-des@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "des.js": "npm:des.js@1.0.1"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "md5.js": "npm:md5.js@1.3.5"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:md5.js@1.3.5": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:browserify-aes@1.2.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.4",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:elliptic@6.5.2": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0",
        "hash.js": "npm:hash.js@1.1.7",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "randombytes": "npm:randombytes@2.1.0",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "is-stream": "npm:is-stream@1.1.0",
        "encoding": "npm:encoding@0.1.12"
      }
    },
    "npm:asn1.js@4.10.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.4",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:des.js@1.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.7",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:hash.js@1.1.7": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.24"
      }
    },
    "npm:iconv-lite@0.4.24": {
      "map": {
        "safer-buffer": "npm:safer-buffer@2.1.2"
      }
    }
  }
});
