# rn-camera-roll-fetcher-ios

A lightweight React Native TurboModule that converts iOS ph:// asset URIs (from the Photos framework) into actual local file URIs (file://). Useful when working with image/video pickers, uploads, or any feature where you need the real file path instead of the abstract ph:// scheme.

## Installation

```sh
npm install rn-camera-roll-fetcher-ios
```

## Usage

```js
import { multiply } from 'rn-camera-roll-fetcher-ios';

// ...

const result = multiply(3, 7);
```

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
