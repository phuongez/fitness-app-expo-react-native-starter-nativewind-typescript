import {defineType, defineField} from 'sanity'
import {Dumbbell} from 'lucide-react'

export default defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  icon: Dumbbell,
  description:
    'Represents a physical exercise with details like name, difficulty, media, and status',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the exercise (e.g., Squat, Push-up)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short explanation of how to perform the exercise or its purpose',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      description: 'The level of difficulty for the exercise',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'An image representing the exercise',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility and SEO',
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
      description: 'A URL link to a video demonstrating the exercise',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Toggle to show whether this exercise is currently available',
      initialValue: true,
    }),
  ],
})
