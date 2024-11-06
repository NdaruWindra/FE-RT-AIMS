import { FaStar } from 'react-icons/fa'
import { ISimpleStep, IReview, IFaq } from './type'
import { microphone, clock, file } from '@/components/assets/images'
import { IoPersonCircle } from 'react-icons/io5'
export const dataSimpleStep: ISimpleStep[] = [
  {
    title: 'Live Audio Recording in Real-Time',
    description:
      'Capture your meetings effortlessly with live audio recording, enabling seamless real-time transcription and summaries for enhanced collaboration.',
    image: microphone,
  },
  {
    title: 'Drag and Drop Your Files to Upload',
    description:
      'Capture your meetings effortlessly with live audio recording, enabling seamless real-time transcription and summaries for enhanced collaboration.',
    image: file,
  },
  {
    title: 'Access Your Meeting History Anytime',
    description:
      'Keep track of all your past meetings effortlessly. Our history feature provides quick access to previous recordings and summaries, ensuring that important details are always at your fingertips. Review, revisit, and share meeting insights with ease.',
    image: clock,
  },
]

export const dataReview: IReview[] = [
  {
    icon: IoPersonCircle,
    name: 'Marco',
    star: FaStar,
    totalStar: 3,
    description:
      'I love how easy it is to summarize my meetings using this website! The live audio recording feature captures every detail, and the summaries are concise and accurate. It saves me so much time!',
    date: '24 Agustus 2024',
  },
  {
    icon: IoPersonCircle,
    name: 'Selta',
    star: FaStar,
    totalStar: 4,
    description:
      'I love how easy it is to summarize my meetings using this website! The live audio recording feature captures every detail, and the summaries are concise and accurate. It saves me so much time!',
    date: '24 Agustus 2024',
  },
  {
    icon: IoPersonCircle,
    name: 'Nyoman',
    star: FaStar,
    totalStar: 5,
    description:
      'I love how easy it is to summarize my meetings using this website! The live audio recording feature captures every detail, and the summaries are concise and accurate. It saves me so much time!',
    date: '24 Agustus 2024',
  },
  {
    icon: IoPersonCircle,
    name: 'Ndaru',
    star: FaStar,
    totalStar: 3,
    description:
      'I love how easy it is to summarize my meetings using this website! The live audio recording feature captures every detail, and the summaries are concise and accurate. It saves me so much time!',
    date: '24 Agustus 2024',
  },
  {
    icon: IoPersonCircle,
    name: 'Virgo',
    star: FaStar,
    totalStar: 1,
    description:
      'I love how easy it is to summarize my meetings using this website! The live audio recording feature captures every detail, and the summaries are concise and accurate. It saves me so much time!',
    date: '24 Agustus 2024',
  },
]

export const dataFaq: IFaq[] = [
  {
    title: 'What is summerized AI?',
    description:
      'Summerized AI is the process for replacing the original spoken language in an audio with a translated version by using artificial intelligence.',
  },
  {
    title: 'What languages do you currently support for audio translation?',
    description:
      'Currently only Indonesian and English, and in the future it will be expanded to other languages.',
  },
  {
    title: 'How long does the audio dubbing process take?',
    description: 'for approximately 30 seconds',
  },
  {
    title: 'What does minute mean?',
    description: '?',
  },
  {
    title: 'What types of content can I translate?',
    description: 'Audio with mp3 and wav types',
  },
]
