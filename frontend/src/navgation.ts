// To define the content of the navigation bar content and  the relationship between different routes
import { NavObject } from "./common"
export const navigations: NavObject[] = [
    {
        name: 'Diet',
        path: '/diet/trainning_day',
        icon: '🍱',
        role: ['coach', 'student'],
        children: [
            {
                name: 'Trainning Day',
                path: '/diet/trainning_day',
                icon: '🏋'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            },
            {
                name: 'Rest Day',
                path: '/diet/rest_day',
                icon: '🧘'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            },
            {
                name: 'Food',
                path: '/diet/food',
                icon: '🧘'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            }
        ]
    },
    {
        name: 'Exercises',
        path: '/exercises',
        role: ['coach', 'student'],
        icon: '🏋',
        children: [
            {
                name: 'Back',
                path: '/exercises/back/summary',
                icon: '🔙',
                children: [
                    {
                        name: 'Summary',
                        path: '/exercises/back/summary',
                        icon: '🔙'
                    },
                    {
                        name: 'Upper',
                        path: '/exercises/back/upper',
                        icon: '🔙'
                    },
                    {
                        name: 'Lat',
                        path: '/exercises/back/lat',
                        icon: '🔙'
                    },
                    {
                        name: 'Trap',
                        path: '/exercises/back/trap',
                        icon: '🔙'
                    },
                ]
            },
            {
                name: 'Chest',
                path: '/exercises/chest/summary',
                icon: '🈷',
                children: [
                    {
                        name: 'Summary',
                        path: '/exercises/chest/summary',
                        icon: '🈷',
                    },
                    {
                        name: 'Upper Chest',
                        path: '/exercises/chest/upper_chest',
                        icon: '🈷',
                    },
                    {
                        name: 'Lower Chest',
                        path: '/exercises/chest/lower_chest',
                        icon: '🈷',
                    },
                    {
                        name: 'Middle Chest',
                        path: '/exercises/chest/middle_chest',
                        icon: '🈷',
                    },
                    {
                        name: 'Inner Chest',
                        path: '/exercises/chest/inner_chest',
                        icon: '🈷',
                    },
                    {
                        name: 'Outer Chest',
                        path: '/exercises/chest/outer_chest',
                        icon: '🈷',
                    },
                ]
            },
            {
                name: 'Shoulder',
                path: '/exercises/shoulder/summary',
                icon: '🙋‍♂️',
                children: [
                    {
                        name: 'Summary',
                        path: '/exercises/shoulder/summary',
                        icon: '🈷',
                    },
                    {
                        name: 'Rear Delt',
                        path: '/exercises/shoulder/rear_delt',
                        icon: '🈷',
                    },
                    {
                        name: 'Side Delt',
                        path: '/exercises/shoulder/side_delt',
                        icon: '🈷',
                    },
                    {
                        name: 'Front Delt',
                        path: '/exercises/shoulder/front_delt',
                        icon: '🈷',
                    },
                ]
            },
            {
                name: 'Arms',
                path: '/exercises/arm',
                icon: '💪',
                children: [
                    {
                        name: 'Summary',
                        path: '/exercises/arm/summary',
                        icon: '💪'
                    },
                    {
                        name: 'Former',
                        path: '/exercises/arm/former',
                        icon: '💪'
                    },
                    {
                        name: 'Tricept',
                        path: '/exercises/arm/tri',
                        icon: '💪'
                    },
                    {
                        name: 'Bicept',
                        path: '/exercises/arm/bi',
                        icon: '💪'
                    },
                ]
            },
            {
                name: 'Legs',
                path: '/exercises/leg',
                icon: '🦵',
                children: [
                    {
                        name: 'Summary',
                        path: '/exercises/leg/summary',
                        icon: '🦵'
                    },
                    {
                        name: 'Quad',
                        path: '/exercises/leg/quad',
                        icon: '🦵'
                    },
                    {
                        name: 'Harmstring',
                        path: '/exercises/leg/harmstring',
                        icon: '🦵'
                    },
                    {
                        name: 'Hip',
                        path: '/exercises/leg/hip',
                        icon: '🦵'
                    }]
            },
            {
                name: 'Core',
                path: '/exercises/core',
                icon: '🧗',
                children: [
                    {
                        name: 'Summary',
                        path: '/exercises/core/summary',
                        icon: '🧗'
                    },
                    {
                        name: 'Upper',
                        path: '/exercises/core/upper',
                        icon: '🧗'
                    },
                    {
                        name: 'Lower',
                        path: '/exercises/core/lower',
                        icon: '🧗'
                    },
                    {
                        name: 'Full',
                        path: '/exercises/core/full',
                        icon: '🧗'
                    },
                ]
            }
        ]
    },
    {
        name: 'Program',
        path: '/program',
        icon: '📝',
        role: ['coach', 'student'],
        children: [
            {
                name: 'Push Day',
                path: '/program/push_day',
                icon: '🦵'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            },
            {
                name: 'Pull Day',
                path: '/program/pull_day',
                icon: '🦵'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            },
            {
                name: 'Legs Day',
                path: '/program/legs_day',
                icon: '🦵'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            },
            {
                name: 'Arms Day',
                path: '/program/arms_day',
                icon: '🦵'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            }
        ]
    },
    {
        name: 'Resource',
        path: '/useful_resources',
        role: ['coach', 'student'],
        icon: '📋',
        children: [
            {
                name: 'Exercises',
                path: '/useful_resources/exercise',
                icon: '🦵'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            },
            {
                name: 'Other',
                path: '/useful_resources/other',
                icon: '🦵'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            }
        ]
    },
    {
        name: 'Progress',
        path: '/progress',
        icon: '📈',
        role: ['coach', 'student'],
        children: [
            {
                name: 'Weight',
                path: '/progress/weight',
                icon: '🦵'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            },
            {
                name: 'Trainning',
                path: '/progress/trainning',
                icon: '🦵'
                // children: [
                //     {
                //         name: 'Trainning Day',
                //         path: '/diet/trainning_day',
                //     },
                //     {
                //         name: 'Rest Day',
                //         path: '/diet/rest_day',
                //     },
                // ]
            }
        ]
    },
    {
        name: 'Coach Area',
        path: '/coach',
        icon: '🦵',
        role: ['coach'],
        children:[
            {
                name: 'Student Management',
                path: '/coach/student_management',
                icon: '🦵'
            },
        ]
    }


]