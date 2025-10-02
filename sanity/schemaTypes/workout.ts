import {defineType, defineField, defineArrayMember} from 'sanity'
import {CalendarClock} from 'lucide-react'

export default defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  icon: CalendarClock,
  description:
    'Workout session của user, gồm ngày, thời lượng và danh sách exercises với sets chi tiết.',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{type: 'user'}], // trỏ tới schema user mới tạo
      description: 'Tham chiếu tới user (Clerk)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Ngày tập',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      description: 'Thời lượng buổi tập',
      validation: (Rule) => Rule.required().integer().min(1).max(7200),
    }),
    defineField({
      name: 'exercises',
      title: 'Exercises',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'workoutExercise',
          title: 'Workout Exercise',
          type: 'object',
          fields: [
            defineField({
              name: 'exercise',
              title: 'Exercise',
              type: 'reference',
              to: [{type: 'exercise'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sets',
              title: 'Sets',
              type: 'array',
              description: 'Chi tiết từng set trong bài tập',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'set',
                  fields: [
                    defineField({
                      name: 'reps',
                      title: 'Reps',
                      type: 'number',
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      type: 'number',
                    }),
                    defineField({
                      name: 'weightUnit',
                      title: 'Unit',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'kg', value: 'kg'},
                          {title: 'lb', value: 'lb'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'kg',
                    }),
                  ],
                  preview: {
                    select: {reps: 'reps', weight: 'weight', unit: 'weightUnit'},
                    prepare({reps, weight, unit}) {
                      return {
                        title: `${reps ?? '?'} reps • ${weight ?? 0}${unit ?? ''}`,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              exerciseName: 'exercise.name',
              sets: 'sets',
            },
            prepare({exerciseName, sets}) {
              const count = Array.isArray(sets) ? sets.length : 0
              return {
                title: exerciseName || 'Unnamed exercise',
                subtitle: `${count} set${count !== 1 ? 's' : ''}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      date: 'date',
      duration: 'duration',
      exercises: 'exercises',
    },
    prepare({date, duration, exercises}) {
      const count = Array.isArray(exercises) ? exercises.length : 0
      return {
        title: date ?? 'No date',
        subtitle: `${duration ?? '?'} min • ${count} exercise${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
