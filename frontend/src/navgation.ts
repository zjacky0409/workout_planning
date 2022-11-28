// To define the content of the navigation bar content and  the relationship between different routes
import { NavObject } from "./common"
export const navigations: NavObject[] = [
    {
        name: 'Diet',
        path: '/diet/trainning_day',
        icon: '🍱',
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
        name: 'Exercise',
        path: '/exercises',
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
                name: 'Arm',
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
                name: 'Leg',
                path: '/exercises/leg',
                icon: '🦵',
                children: [
                    {
                        name: 'Summary',
                        path: '/exercises/leg/summary',
                        icon: '🦵'
                    },
                    {
                        name: 'Former',
                        path: '/exercises/leg/quad',
                        icon: '🦵'
                    },
                    {
                        name: 'Tricept',
                        path: '/exercises/leg/harmstring',
                        icon: '🦵'
                    },
                    {
                        name: 'Bicept',
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
        icon: '📋',
        children: [
            {
                name: 'Exercise',
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
                name: 'Training',
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
    }


]