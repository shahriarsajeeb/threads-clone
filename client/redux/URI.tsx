import {Platform} from 'react-native';

let URI = '';

if (Platform.OS === 'ios') {
  URI = 'https://threads-clone-hxxlv7qox-shahriarsajeeb.vercel.app/api/v1';
} else {
  URI = 'https://threads-clone-hxxlv7qox-shahriarsajeeb.vercel.app/api/v1';
}

export {URI};
