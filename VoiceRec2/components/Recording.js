import { Button } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect } from 'react';

const Recording = ({ recording, setRecording, setSound, setRecordingUri, metering, setMetering, isRecordingRunning, setIsRecordingRunning }) => {
    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) {
                console.log('Permissions not granted');
                return;
            }

            console.log('Starting recording..');
            const recordingOptions = {
                isMeteringEnabled: true,
                android: {
                    extension: '.3gp',
                    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
                    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                    bitRate: 128000,
                },
                ios: {
                    extension: '.m4a',
                    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
                    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                    bitRate: 128000,
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
            };

            const { recording } = await Audio.Recording.createAsync(recordingOptions);
            setRecording(recording);
            console.log('Recording started');
            setIsRecordingRunning(true);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        setRecording(null);
        setSound(new Audio.Sound());
        console.log('Recording stopped and stored at', uri);
        setRecordingUri(uri); // Update the recording URI state variable
        setIsRecordingRunning(false);
    }

    useEffect(() => {
        let timerId;
        let meteringReadings = [];
        async function monitorLoudness() {
            if (recording) {
                metering = await recording.getStatusAsync();
                setMetering(metering);
                console.log('metering', metering);

                meteringReadings.push(metering.metering);

                if (meteringReadings.length >= 6) {
                    // Check if the last six metering readings are both less than -22 and more than -3
                    const lastSixReadings = meteringReadings.slice(-6);
                    const areLastSixLessThan22 = lastSixReadings.every(reading => reading < -22 || reading > -3);
                    if (areLastSixLessThan22) {
                        console.log('last six readings are both less than -22 and more than -3');
                        stopRecording()
                    }
                }

                if (meteringReadings.length > 6) {
                    meteringReadings.shift(); // Remove the oldest metering reading from the array
                }

            }
        }
        function myFunction() {
            if (isRecordingRunning) {
                timerId = setInterval(monitorLoudness, 500);
                console.log('getting metering data');
            } else {
                clearInterval(timerId);
                meteringReadings = [];
            }
        }
        myFunction();
    
        return () => {
            clearInterval(timerId);
            meteringReadings = [];
        };
    }, [isRecordingRunning]);

    return (
        <Button
            title={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? stopRecording : startRecording}
        />
    )
}

export default Recording;