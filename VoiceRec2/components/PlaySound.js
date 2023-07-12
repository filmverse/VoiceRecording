import { Audio } from 'expo-av';
import { Button } from 'react-native';

const PlaySound = ({ recordingUri, setSound }) => {
    async function playSound() {
        if (recordingUri) {
            console.log('Loading Sound');
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync({ uri: recordingUri });
                setSound(soundObject);

                console.log('Playing Sound');
                await soundObject.playAsync();
            } catch (error) {
                console.error('Failed to play sound', error);
            }
        } else {
            console.log('No recording available');
        }
    }

    return (
        <Button title="Play Sound" onPress={playSound} />
    )
}


export default PlaySound;