import * as IData from "../../interfaces/data";
export interface IDump {
    users: IData.IDataUser[]
    modes: IData.IDataMode[]
    specialities: IData.IDataSpeciality[]
    tasks: IData.IDataTask[]
    options: IData.IDataOption[]
    attempts?: IData.IDataAttempt[]
    answers?: IData.IDataAnswer[]
}
export const users = [
    "Андрей Лещук 1 14 12.23.2020",
    "Владислав Семакин 1 8 03.01.2021",
    "Кирилл Муравьев 3 14 01.01.2020",
    "Григорий Василевский 1 12 01.01.2019",
    "Антон Голубков 1 16 01.01.2019",
    "Екатерина Казимирова 3 8 01.01.2021",
    "Валентин Дороднов 2 14 01.01.2019",
    "Богдан Амяга 1 8 01.01.2021",
    "Сергей Доброхотов 3 12 01.01.2019",
    "Виктория Чмиль 1 6 01.01.2021",
];
export const lorem = [
    "Proin tristique, leo tristique hendrerit dignissim, turpis urna mollis massa, a congue tortor ante eget leo.",
    "Vivamus sodales diam in leo volutpat, vitae tincidunt ligula fermentum.",
    "Curabitur condimentum nulla eget mattis viverra.",
    "Maecenas cursus justo quis est rhoncus pretium.",
    "Pellentesque id elementum erat.",
    "Mauris ut risus non neque mattis porta sit amet et augue.",
    "Proin interdum suscipit magna, sed blandit orci gravida sit amet.",
    "Nunc tincidunt elit vel sem tincidunt, et tempor lorem posuere.",
    "Phasellus laoreet tortor molestie pharetra luctus.",
    "Suspendisse sed varius lorem.",
    "Etiam et massa quis purus ornare fermentum sed eget sapien.",
    "Sed consectetur, sapien id lacinia luctus, dolor justo semper leo, sed vestibulum nunc turpis in sem.",
    "Etiam molestie tellus in libero iaculis, sit amet congue quam vestibulum.",
    "Maecenas gravida dolor eleifend nisl dictum semper.",
    "Mauris consectetur neque nec ex rutrum, sit amet tristique orci venenatis.",
    "Duis hendrerit luctus metus, eu ultrices augue euismod et.",
    "In a vulputate mi.",
    "In hac habitasse platea dictumst.",
    "Nam non urna volutpat, ultricies velit eget, elementum risus.",
    "Sed tristique metus in aliquet sagittis.",
    "Fusce nec tortor semper, ultrices turpis in, mattis elit.",
    "Mauris fermentum lorem mollis est pellentesque, vel ultrices diam condimentum.",
    "Morbi commodo elementum ex pretium laoreet.",
    "Donec quis tellus lectus.",
    "Nam placerat eros et pharetra vulputate.",
    "Praesent elit dui, scelerisque in mattis eu, lobortis eu quam.",
    "Vestibulum non tellus sit amet libero dapibus venenatis eu feugiat lacus.",
    "Praesent dictum ipsum nec feugiat lobortis.",
    "Nulla semper, odio eu elementum cursus, nisl purus commodo lectus, ut ultrices ipsum lectus quis leo.",
    "Cras ex odio, elementum eget blandit et, porta id est.",
    "Nam ultrices ante vel massa ullamcorper, et volutpat odio lacinia.",
    "Etiam quis elit convallis, suscipit est ut, pretium diam.",
    "Proin malesuada euismod enim nec bibendum.",
    "Mauris at vehicula velit.",
    "Maecenas suscipit ex nisl, ut auctor lorem efficitur vel.",
    "Praesent varius nec nibh ac scelerisque.",
    "Sed at lacinia felis.",
    "Cras tristique quam in sem posuere, vitae laoreet lectus dictum.",
    "Nunc varius imperdiet nisi a tempus.",
    "Sed bibendum, massa in semper dictum, neque enim faucibus sapien, non malesuada tortor velit a quam.",
    "Nam vel efficitur erat.",
    "Etiam sodales vel felis vitae fermentum.",
    "Aenean vitae erat quis lectus scelerisque pulvinar.",
    "Morbi sed nisi eros.",
    "Nunc pharetra elit dictum orci finibus tincidunt.",
    "Donec odio elit, vulputate ac nisl et, dignissim maximus erat.",
    "Phasellus diam orci, porta vulputate risus nec, bibendum malesuada enim.",
    "Aenean auctor dictum augue in placerat.",
    "Maecenas et dictum arcu, eget tristique risus.",
    "Nam ultricies ante sit amet magna pulvinar scelerisque.",
    "Ut imperdiet consectetur augue, ac ullamcorper erat ultricies quis.",
    "Nulla vitae tortor interdum, ultricies urna in, finibus nisl.",
    "Fusce risus orci, scelerisque vitae elit sit amet, pretium viverra dolor.",
    "Donec in porttitor massa, blandit elementum tellus.",
    "Curabitur a risus risus.",
    "Phasellus lacus massa, ornare eget orci ut, pretium dignissim tellus.",
    "Praesent aliquet porttitor iaculis.",
    "Etiam rutrum nulla ut tellus egestas, mollis mattis diam semper.",
    "Donec nulla turpis, finibus vitae faucibus quis, porttitor ac velit.",
    "Etiam egestas velit dui.",
    "Integer urna velit, pretium et lectus eu, finibus ullamcorper nulla.",
    "Aenean laoreet mauris eu elit pulvinar rhoncus.",
    "Pellentesque turpis mauris, egestas quis aliquet a, tempus vel mauris.",
    "Nulla condimentum, orci eu sollicitudin placerat, quam metus pellentesque mauris, sit amet lacinia nisl turpis eget lorem.",
    "Mauris eu tincidunt elit.",
    "Vestibulum ut vestibulum magna.",
    "Maecenas quis porttitor lectus.",
    "Sed tincidunt pellentesque elit, eget scelerisque nisi auctor et.",
    "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    "Nullam posuere, mauris ac aliquam tempus, ex quam gravida augue, pretium commodo felis lacus a diam.",
    "Quisque venenatis nunc et dignissim interdum.",
    "Proin ornare accumsan tempor.",
    "Integer pretium placerat neque, nec tincidunt tortor semper at.",
    "Pellentesque a augue vitae risus suscipit lobortis.",
    "Quisque cursus felis a rhoncus dignissim.",
    "Vestibulum sit amet dictum neque.",
    "Fusce vulputate, odio et luctus dignissim, neque lorem commodo velit, et posuere risus justo fringilla tellus.",
    "Duis justo turpis, auctor finibus justo at, ullamcorper sodales justo.",
    "Donec sit amet eros massa.",
    "Nullam sed lobortis nulla.",
    "Curabitur ut iaculis massa.",
    "Fusce nec luctus sapien, vitae viverra risus.",
    "Suspendisse et metus tincidunt, pulvinar ligula sit amet, sagittis diam.",
    "Fusce accumsan enim felis, nec consectetur leo suscipit et.",
    "Proin et iaculis nisl.",
    "Morbi ullamcorper purus non ipsum pellentesque accumsan.",
    "Etiam quis dui vitae justo tincidunt scelerisque ut sit amet nisi.",
    "Pellentesque ac nisi purus.",
    "Nam condimentum imperdiet odio, vestibulum placerat neque.",
    "Ut lorem dolor, commodo a nibh sed, sagittis consectetur enim.",
    "Maecenas tempus, risus et pulvinar placerat, mauris augue porta nulla, at congue neque leo at sem.",
    "Maecenas ac odio in nisl sollicitudin porttitor ac in turpis.",
    "Vivamus a leo sed est sollicitudin tincidunt eu vitae velit.",
    "Praesent pretium ut eros quis rhoncus.",
    "Curabitur euismod velit massa, a sodales arcu ullamcorper at.",
    "Nunc eu leo sit amet nisl maximus imperdiet id ornare justo.",
    "Curabitur turpis nisi, pretium vitae pulvinar ac, blandit ut ipsum.",
    "Vestibulum a metus venenatis, pretium est nec, ornare purus.",
    "Nam fringilla dui sed lectus vestibulum, et consequat sapien pharetra.",
    "Nam vel hendrerit urna.",
    "Morbi elit dolor, tristique luctus lectus et, bibendum consectetur dolor.",
    "Aenean quis tellus eget nunc laoreet vestibulum sit amet eget massa.",
    "Nullam tincidunt vulputate eleifend.",
    "Vivamus vitae purus sit amet lectus bibendum ultrices quis a ligula.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "Donec eget ultricies lorem.",
    "Maecenas suscipit nec orci vel tempor.",
    "Cras euismod diam finibus tortor tincidunt, a mattis augue fringilla.",
    "Donec efficitur volutpat nisl, quis hendrerit arcu posuere eu.",
    "Mauris consequat porttitor lectus, ac porttitor dolor bibendum id.",
    "Mauris placerat arcu augue, sed interdum massa rutrum in.",
    "Cras ac purus sed nulla faucibus posuere volutpat sit amet eros.",
    "Duis venenatis ornare augue et varius.",
    "Integer ullamcorper lobortis euismod.",
    "Sed sollicitudin elementum elementum.",
    "Morbi et consequat massa.",
    "Duis turpis est, placerat ut sollicitudin a, sodales et felis.",
    "Duis id finibus eros.",
    "Nulla facilisi.",
    "Morbi mattis sit amet quam et fermentum.",
    "Etiam pellentesque luctus dolor eget imperdiet.",
    "Donec malesuada orci a quam commodo finibus.",
    "Proin vitae metus semper turpis commodo rutrum ac id orci.",
];
export const dump: IDump = {
    "modes": [
        {
            "id": 1,
            "name": "Одиночный выбор"
        },
        {
            "id": 2,
            "name": "Множественный выбор"
        },
        {
            "id": 3,
            "name": "Ввод ответа"
        }
    ],
    "specialities": [
        {
            "id": 1,
            "name": "Фронтэнд разработка"
        },
        {
            "id": 2,
            "name": "Бекэнд разработка"
        },
        {
            "id": 3,
            "name": "Тестирование"
        }
    ],
    "users": [
        {
            "id": 1,
            "userUid": "a9c0a48e-8dc1-4bbe-aea0-d5973a118e9a",
            "firstName": "Андрей",
            "lastName": "Лещук",
            "speciality": 1,
            "grade": 14,
            "hiringDate": "2020-12-22T21:00:00.000Z"
        },
        {
            "id": 2,
            "userUid": "626dfb82-1023-41c1-9966-751b03d535f2",
            "firstName": "Владислав",
            "lastName": "Семакин",
            "speciality": 1,
            "grade": 8,
            "hiringDate": "2021-02-28T21:00:00.000Z"
        },
        {
            "id": 3,
            "userUid": "28b2226f-e55e-4b39-85e7-1c482c16dbb4",
            "firstName": "Кирилл",
            "lastName": "Муравьев",
            "speciality": 3,
            "grade": 14,
            "hiringDate": "2019-12-31T21:00:00.000Z"
        },
        {
            "id": 4,
            "userUid": "01c7c750-dea5-49a1-8645-26caa335b618",
            "firstName": "Григорий",
            "lastName": "Василевский",
            "speciality": 1,
            "grade": 12,
            "hiringDate": "2018-12-31T21:00:00.000Z"
        },
        {
            "id": 5,
            "userUid": "2be22895-567b-49f4-a710-37a1b0c58722",
            "firstName": "Антон",
            "lastName": "Голубков",
            "speciality": 1,
            "grade": 16,
            "hiringDate": "2018-12-31T21:00:00.000Z"
        },
        {
            "id": 6,
            "userUid": "0d19dc96-a271-4f44-9eed-3262892a99ee",
            "firstName": "Екатерина",
            "lastName": "Казимирова",
            "speciality": 3,
            "grade": 8,
            "hiringDate": "2020-12-31T21:00:00.000Z"
        },
        {
            "id": 7,
            "userUid": "9cdab4b3-c4de-4f18-84e9-8b4321698846",
            "firstName": "Валентин",
            "lastName": "Дороднов",
            "speciality": 2,
            "grade": 14,
            "hiringDate": "2018-12-31T21:00:00.000Z"
        },
        {
            "id": 8,
            "userUid": "f3325456-bb94-4034-9d0d-39a7a6d7a75b",
            "firstName": "Богдан",
            "lastName": "Амяга",
            "speciality": 1,
            "grade": 8,
            "hiringDate": "2020-12-31T21:00:00.000Z"
        },
        {
            "id": 9,
            "userUid": "c9fb62b1-612a-4ace-96a5-4f6405e17e28",
            "firstName": "Сергей",
            "lastName": "Доброхотов",
            "speciality": 3,
            "grade": 12,
            "hiringDate": "2018-12-31T21:00:00.000Z"
        },
        {
            "id": 10,
            "userUid": "5f627cb4-f33e-47b8-9f1a-311dde44e8ac",
            "firstName": "Виктория",
            "lastName": "Чмиль",
            "speciality": 1,
            "grade": 6,
            "hiringDate": "2020-12-31T21:00:00.000Z"
        }
    ],
    "tasks": [
        {
            "id": 2,
            "text": "Задача 2. Sed tincidunt pellentesque elit, eget scelerisque nisi auctor et.",
            "speciality": 1,
            "grade": 10,
            "mode": 1
        },
        {
            "id": 3,
            "text": "Задача 3. Vestibulum ut vestibulum magna.",
            "speciality": 3,
            "grade": 16,
            "mode": 1
        },
        {
            "id": 4,
            "text": "Задача 4. Fusce accumsan enim felis, nec consectetur leo suscipit et.",
            "speciality": 2,
            "grade": 14,
            "mode": 2
        },
        {
            "id": 5,
            "text": "Задача 5. Sed consectetur, sapien id lacinia luctus, dolor justo semper leo, sed vestibulum nunc turpis in sem.",
            "speciality": 2,
            "grade": 6,
            "mode": 3
        },
        {
            "id": 6,
            "text": "Задача 6. Nam placerat eros et pharetra vulputate.",
            "speciality": 2,
            "grade": 10,
            "mode": 1
        },
        {
            "id": 7,
            "text": "Задача 7. Nulla semper, odio eu elementum cursus, nisl purus commodo lectus, ut ultrices ipsum lectus quis leo.",
            "speciality": 1,
            "grade": 12,
            "mode": 2
        },
        {
            "id": 8,
            "text": "Задача 8. Phasellus lacus massa, ornare eget orci ut, pretium dignissim tellus.",
            "speciality": 1,
            "grade": 5,
            "mode": 3
        },
        {
            "id": 9,
            "text": "Задача 9. Mauris consequat porttitor lectus, ac porttitor dolor bibendum id.",
            "speciality": 3,
            "grade": 15,
            "mode": 1
        },
        {
            "id": 10,
            "text": "Задача 10. Nulla vitae tortor interdum, ultricies urna in, finibus nisl.",
            "speciality": 3,
            "grade": 3,
            "mode": 3
        },
        {
            "id": 11,
            "text": "Задача 11. Praesent pretium ut eros quis rhoncus.",
            "speciality": 1,
            "grade": 7,
            "mode": 3
        },
        {
            "id": 12,
            "text": "Задача 12. Sed tincidunt pellentesque elit, eget scelerisque nisi auctor et.",
            "speciality": 2,
            "grade": 2,
            "mode": 2
        },
        {
            "id": 13,
            "text": "Задача 13. Pellentesque ac nisi purus.",
            "speciality": 3,
            "grade": 12,
            "mode": 2
        },
        {
            "id": 14,
            "text": "Задача 14. Maecenas suscipit nec orci vel tempor.",
            "speciality": 3,
            "grade": 15,
            "mode": 3
        },
        {
            "id": 15,
            "text": "Задача 15. Maecenas suscipit nec orci vel tempor.",
            "speciality": 1,
            "grade": 9,
            "mode": 1
        },
        {
            "id": 16,
            "text": "Задача 16. Nam vel efficitur erat.",
            "speciality": 3,
            "grade": 6,
            "mode": 2
        },
        {
            "id": 17,
            "text": "Задача 17. Proin tristique, leo tristique hendrerit dignissim, turpis urna mollis massa, a congue tortor ante eget leo.",
            "speciality": 2,
            "grade": 13,
            "mode": 1
        },
        {
            "id": 18,
            "text": "Задача 18. Nam fringilla dui sed lectus vestibulum, et consequat sapien pharetra.",
            "speciality": 2,
            "grade": 12,
            "mode": 1
        },
        {
            "id": 19,
            "text": "Задача 19. Donec nulla turpis, finibus vitae faucibus quis, porttitor ac velit.",
            "speciality": 2,
            "grade": 15,
            "mode": 1
        },
        {
            "id": 20,
            "text": "Задача 20. Pellentesque id elementum erat.",
            "speciality": 3,
            "grade": 14,
            "mode": 2
        },
        {
            "id": 21,
            "text": "Задача 21. Nunc eu leo sit amet nisl maximus imperdiet id ornare justo.",
            "speciality": 1,
            "grade": 3,
            "mode": 3
        },
        {
            "id": 22,
            "text": "Задача 22. Duis id finibus eros.",
            "speciality": 3,
            "grade": 12,
            "mode": 2
        },
        {
            "id": 23,
            "text": "Задача 23. Nunc eu leo sit amet nisl maximus imperdiet id ornare justo.",
            "speciality": 1,
            "grade": 16,
            "mode": 3
        },
        {
            "id": 24,
            "text": "Задача 24. Etiam egestas velit dui.",
            "speciality": 2,
            "grade": 5,
            "mode": 2
        },
        {
            "id": 25,
            "text": "Задача 25. Nam vel hendrerit urna.",
            "speciality": 2,
            "grade": 6,
            "mode": 2
        },
        {
            "id": 26,
            "text": "Задача 26. Nam ultrices ante vel massa ullamcorper, et volutpat odio lacinia.",
            "speciality": 2,
            "grade": 8,
            "mode": 2
        },
        {
            "id": 27,
            "text": "Задача 27. Donec nulla turpis, finibus vitae faucibus quis, porttitor ac velit.",
            "speciality": 1,
            "grade": 14,
            "mode": 3
        },
        {
            "id": 28,
            "text": "Задача 28. Morbi sed nisi eros.",
            "speciality": 3,
            "grade": 11,
            "mode": 3
        },
        {
            "id": 29,
            "text": "Задача 29. Aenean quis tellus eget nunc laoreet vestibulum sit amet eget massa.",
            "speciality": 2,
            "grade": 6,
            "mode": 2
        },
        {
            "id": 30,
            "text": "Задача 30. Curabitur condimentum nulla eget mattis viverra.",
            "speciality": 2,
            "grade": 2,
            "mode": 2
        },
        {
            "id": 31,
            "text": "Задача 31. Nam ultricies ante sit amet magna pulvinar scelerisque.",
            "speciality": 2,
            "grade": 14,
            "mode": 3
        },
        {
            "id": 32,
            "text": "Задача 32. Maecenas ac odio in nisl sollicitudin porttitor ac in turpis.",
            "speciality": 2,
            "grade": 7,
            "mode": 1
        },
        {
            "id": 33,
            "text": "Задача 33. Fusce nec tortor semper, ultrices turpis in, mattis elit.",
            "speciality": 2,
            "grade": 2,
            "mode": 1
        },
        {
            "id": 34,
            "text": "Задача 34. Integer pretium placerat neque, nec tincidunt tortor semper at.",
            "speciality": 3,
            "grade": 4,
            "mode": 2
        },
        {
            "id": 35,
            "text": "Задача 35. Praesent dictum ipsum nec feugiat lobortis.",
            "speciality": 2,
            "grade": 13,
            "mode": 1
        },
        {
            "id": 36,
            "text": "Задача 36. Nam ultricies ante sit amet magna pulvinar scelerisque.",
            "speciality": 2,
            "grade": 3,
            "mode": 1
        },
        {
            "id": 37,
            "text": "Задача 37. Fusce accumsan enim felis, nec consectetur leo suscipit et.",
            "speciality": 1,
            "grade": 1,
            "mode": 2
        },
        {
            "id": 38,
            "text": "Задача 38. Nulla vitae tortor interdum, ultricies urna in, finibus nisl.",
            "speciality": 3,
            "grade": 5,
            "mode": 2
        },
        {
            "id": 39,
            "text": "Задача 39. Nulla vitae tortor interdum, ultricies urna in, finibus nisl.",
            "speciality": 3,
            "grade": 10,
            "mode": 2
        },
        {
            "id": 40,
            "text": "Задача 40. Nam non urna volutpat, ultricies velit eget, elementum risus.",
            "speciality": 2,
            "grade": 4,
            "mode": 3
        },
        {
            "id": 41,
            "text": "Задача 41. Nulla semper, odio eu elementum cursus, nisl purus commodo lectus, ut ultrices ipsum lectus quis leo.",
            "speciality": 1,
            "grade": 10,
            "mode": 1
        },
        {
            "id": 42,
            "text": "Задача 42. Duis venenatis ornare augue et varius.",
            "speciality": 1,
            "grade": 11,
            "mode": 1
        },
        {
            "id": 43,
            "text": "Задача 43. Proin interdum suscipit magna, sed blandit orci gravida sit amet.",
            "speciality": 1,
            "grade": 2,
            "mode": 1
        },
        {
            "id": 44,
            "text": "Задача 44. Nullam tincidunt vulputate eleifend.",
            "speciality": 2,
            "grade": 15,
            "mode": 1
        },
        {
            "id": 45,
            "text": "Задача 45. Vestibulum non tellus sit amet libero dapibus venenatis eu feugiat lacus.",
            "speciality": 3,
            "grade": 16,
            "mode": 2
        },
        {
            "id": 46,
            "text": "Задача 46. Pellentesque turpis mauris, egestas quis aliquet a, tempus vel mauris.",
            "speciality": 3,
            "grade": 12,
            "mode": 1
        },
        {
            "id": 47,
            "text": "Задача 47. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "speciality": 1,
            "grade": 1,
            "mode": 3
        },
        {
            "id": 48,
            "text": "Задача 48. Donec eget ultricies lorem.",
            "speciality": 3,
            "grade": 10,
            "mode": 1
        },
        {
            "id": 49,
            "text": "Задача 49. Donec in porttitor massa, blandit elementum tellus.",
            "speciality": 1,
            "grade": 9,
            "mode": 3
        },
        {
            "id": 50,
            "text": "Задача 50. Duis justo turpis, auctor finibus justo at, ullamcorper sodales justo.",
            "speciality": 3,
            "grade": 16,
            "mode": 1
        },
        {
            "id": 51,
            "text": "Задача 51. Sed sollicitudin elementum elementum.",
            "speciality": 2,
            "grade": 16,
            "mode": 1
        }
    ],
    "options": [
        {
            "id": 1,
            "task": 2,
            "text": "Опция 1. Vestibulum non tellus sit amet libero dapibus venenatis eu feugiat lacus.",
            "correct": true
        },
        {
            "id": 2,
            "task": 2,
            "text": "Опция 2. Nam placerat eros et pharetra vulputate.",
            "correct": false
        },
        {
            "id": 3,
            "task": 2,
            "text": "Опция 3. Cras ex odio, elementum eget blandit et, porta id est.",
            "correct": false
        },
        {
            "id": 4,
            "task": 2,
            "text": "Опция 4. Nullam sed lobortis nulla.",
            "correct": false
        },
        {
            "id": 5,
            "task": 3,
            "text": "Опция 1. Ut lorem dolor, commodo a nibh sed, sagittis consectetur enim.",
            "correct": false
        },
        {
            "id": 6,
            "task": 3,
            "text": "Опция 2. Donec quis tellus lectus.",
            "correct": false
        },
        {
            "id": 7,
            "task": 3,
            "text": "Опция 3. Nulla facilisi.",
            "correct": true
        },
        {
            "id": 8,
            "task": 3,
            "text": "Опция 4. Morbi commodo elementum ex pretium laoreet.",
            "correct": false
        },
        {
            "id": 9,
            "task": 3,
            "text": "Опция 5. Vestibulum sit amet dictum neque.",
            "correct": false
        },
        {
            "id": 10,
            "task": 3,
            "text": "Опция 6. Pellentesque id elementum erat.",
            "correct": false
        },
        {
            "id": 11,
            "task": 4,
            "text": "Опция 1. Praesent pretium ut eros quis rhoncus.",
            "correct": true
        },
        {
            "id": 12,
            "task": 4,
            "text": "Опция 2. Donec in porttitor massa, blandit elementum tellus.",
            "correct": true
        },
        {
            "id": 13,
            "task": 4,
            "text": "Опция 3. Praesent varius nec nibh ac scelerisque.",
            "correct": false
        },
        {
            "id": 14,
            "task": 4,
            "text": "Опция 4. Morbi et consequat massa.",
            "correct": true
        },
        {
            "id": 15,
            "task": 4,
            "text": "Опция 5. Cras tristique quam in sem posuere, vitae laoreet lectus dictum.",
            "correct": false
        },
        {
            "id": 16,
            "task": 5,
            "regEx": "\\d+"
        },
        {
            "id": 17,
            "task": 6,
            "text": "Опция 1. Duis justo turpis, auctor finibus justo at, ullamcorper sodales justo.",
            "correct": false
        },
        {
            "id": 18,
            "task": 6,
            "text": "Опция 2. Aenean vitae erat quis lectus scelerisque pulvinar.",
            "correct": false
        },
        {
            "id": 19,
            "task": 6,
            "text": "Опция 3. Pellentesque id elementum erat.",
            "correct": true
        },
        {
            "id": 20,
            "task": 6,
            "text": "Опция 4. Cras ex odio, elementum eget blandit et, porta id est.",
            "correct": false
        },
        {
            "id": 21,
            "task": 7,
            "text": "Опция 1. Proin et iaculis nisl.",
            "correct": false
        },
        {
            "id": 22,
            "task": 7,
            "text": "Опция 2. Morbi sed nisi eros.",
            "correct": false
        },
        {
            "id": 23,
            "task": 7,
            "text": "Опция 3. Vivamus a leo sed est sollicitudin tincidunt eu vitae velit.",
            "correct": true
        },
        {
            "id": 24,
            "task": 7,
            "text": "Опция 4. Nam placerat eros et pharetra vulputate.",
            "correct": false
        },
        {
            "id": 25,
            "task": 7,
            "text": "Опция 5. Etiam sodales vel felis vitae fermentum.",
            "correct": false
        },
        {
            "id": 26,
            "task": 8,
            "regEx": "\\d+"
        },
        {
            "id": 27,
            "task": 9,
            "text": "Опция 1. Proin interdum suscipit magna, sed blandit orci gravida sit amet.",
            "correct": true
        },
        {
            "id": 28,
            "task": 9,
            "text": "Опция 2. Maecenas ac odio in nisl sollicitudin porttitor ac in turpis.",
            "correct": false
        },
        {
            "id": 29,
            "task": 9,
            "text": "Опция 3. Cras ex odio, elementum eget blandit et, porta id est.",
            "correct": false
        },
        {
            "id": 30,
            "task": 9,
            "text": "Опция 4. Nunc varius imperdiet nisi a tempus.",
            "correct": false
        },
        {
            "id": 31,
            "task": 9,
            "text": "Опция 5. Etiam sodales vel felis vitae fermentum.",
            "correct": false
        },
        {
            "id": 32,
            "task": 9,
            "text": "Опция 6. Duis id finibus eros.",
            "correct": false
        },
        {
            "id": 33,
            "task": 10,
            "regEx": "\\d+"
        },
        {
            "id": 34,
            "task": 11,
            "regEx": "\\d+"
        },
        {
            "id": 35,
            "task": 12,
            "text": "Опция 1. Duis turpis est, placerat ut sollicitudin a, sodales et felis.",
            "correct": true
        },
        {
            "id": 36,
            "task": 12,
            "text": "Опция 2. Aenean auctor dictum augue in placerat.",
            "correct": true
        },
        {
            "id": 37,
            "task": 12,
            "text": "Опция 3. Nam condimentum imperdiet odio, vestibulum placerat neque.",
            "correct": true
        },
        {
            "id": 38,
            "task": 12,
            "text": "Опция 4. Vestibulum ut vestibulum magna.",
            "correct": true
        },
        {
            "id": 39,
            "task": 12,
            "text": "Опция 5. Praesent varius nec nibh ac scelerisque.",
            "correct": false
        },
        {
            "id": 40,
            "task": 13,
            "text": "Опция 1. Vestibulum non tellus sit amet libero dapibus venenatis eu feugiat lacus.",
            "correct": true
        },
        {
            "id": 41,
            "task": 13,
            "text": "Опция 2. Etiam quis dui vitae justo tincidunt scelerisque ut sit amet nisi.",
            "correct": false
        },
        {
            "id": 42,
            "task": 13,
            "text": "Опция 3. Proin et iaculis nisl.",
            "correct": false
        },
        {
            "id": 43,
            "task": 14,
            "regEx": "\\d+"
        },
        {
            "id": 44,
            "task": 15,
            "text": "Опция 1. Praesent pretium ut eros quis rhoncus.",
            "correct": false
        },
        {
            "id": 45,
            "task": 15,
            "text": "Опция 2. Mauris at vehicula velit.",
            "correct": true
        },
        {
            "id": 46,
            "task": 15,
            "text": "Опция 3. Fusce accumsan enim felis, nec consectetur leo suscipit et.",
            "correct": false
        },
        {
            "id": 47,
            "task": 15,
            "text": "Опция 4. Phasellus lacus massa, ornare eget orci ut, pretium dignissim tellus.",
            "correct": false
        },
        {
            "id": 48,
            "task": 15,
            "text": "Опция 5. Curabitur condimentum nulla eget mattis viverra.",
            "correct": false
        },
        {
            "id": 49,
            "task": 16,
            "text": "Опция 1. Donec odio elit, vulputate ac nisl et, dignissim maximus erat.",
            "correct": false
        },
        {
            "id": 50,
            "task": 16,
            "text": "Опция 2. Etiam quis dui vitae justo tincidunt scelerisque ut sit amet nisi.",
            "correct": true
        },
        {
            "id": 51,
            "task": 16,
            "text": "Опция 3. Duis id finibus eros.",
            "correct": false
        },
        {
            "id": 52,
            "task": 17,
            "text": "Опция 1. Mauris at vehicula velit.",
            "correct": true
        },
        {
            "id": 53,
            "task": 17,
            "text": "Опция 2. Nunc tincidunt elit vel sem tincidunt, et tempor lorem posuere.",
            "correct": false
        },
        {
            "id": 54,
            "task": 17,
            "text": "Опция 3. Nam vel efficitur erat.",
            "correct": false
        },
        {
            "id": 55,
            "task": 17,
            "text": "Опция 4. Vestibulum non tellus sit amet libero dapibus venenatis eu feugiat lacus.",
            "correct": false
        },
        {
            "id": 56,
            "task": 17,
            "text": "Опция 5. Curabitur a risus risus.",
            "correct": false
        },
        {
            "id": 57,
            "task": 17,
            "text": "Опция 6. Nam vel efficitur erat.",
            "correct": false
        },
        {
            "id": 58,
            "task": 18,
            "text": "Опция 1. Nulla vitae tortor interdum, ultricies urna in, finibus nisl.",
            "correct": false
        },
        {
            "id": 59,
            "task": 18,
            "text": "Опция 2. Proin malesuada euismod enim nec bibendum.",
            "correct": false
        },
        {
            "id": 60,
            "task": 18,
            "text": "Опция 3. Etiam molestie tellus in libero iaculis, sit amet congue quam vestibulum.",
            "correct": false
        },
        {
            "id": 61,
            "task": 18,
            "text": "Опция 4. Mauris consequat porttitor lectus, ac porttitor dolor bibendum id.",
            "correct": true
        },
        {
            "id": 62,
            "task": 19,
            "text": "Опция 1. Proin interdum suscipit magna, sed blandit orci gravida sit amet.",
            "correct": false
        },
        {
            "id": 63,
            "task": 19,
            "text": "Опция 2. Pellentesque turpis mauris, egestas quis aliquet a, tempus vel mauris.",
            "correct": true
        },
        {
            "id": 64,
            "task": 19,
            "text": "Опция 3. Nam non urna volutpat, ultricies velit eget, elementum risus.",
            "correct": false
        },
        {
            "id": 65,
            "task": 19,
            "text": "Опция 4. Cras euismod diam finibus tortor tincidunt, a mattis augue fringilla.",
            "correct": false
        },
        {
            "id": 66,
            "task": 19,
            "text": "Опция 5. Integer urna velit, pretium et lectus eu, finibus ullamcorper nulla.",
            "correct": false
        },
        {
            "id": 67,
            "task": 19,
            "text": "Опция 6. Nam ultrices ante vel massa ullamcorper, et volutpat odio lacinia.",
            "correct": false
        },
        {
            "id": 68,
            "task": 20,
            "text": "Опция 1. Proin ornare accumsan tempor.",
            "correct": true
        },
        {
            "id": 69,
            "task": 20,
            "text": "Опция 2. Donec in porttitor massa, blandit elementum tellus.",
            "correct": true
        },
        {
            "id": 70,
            "task": 20,
            "text": "Опция 3. Etiam pellentesque luctus dolor eget imperdiet.",
            "correct": true
        },
        {
            "id": 71,
            "task": 20,
            "text": "Опция 4. Maecenas et dictum arcu, eget tristique risus.",
            "correct": true
        },
        {
            "id": 72,
            "task": 20,
            "text": "Опция 5. Nunc pharetra elit dictum orci finibus tincidunt.",
            "correct": true
        },
        {
            "id": 73,
            "task": 21,
            "regEx": "\\d+"
        },
        {
            "id": 74,
            "task": 22,
            "text": "Опция 1. Phasellus laoreet tortor molestie pharetra luctus.",
            "correct": true
        },
        {
            "id": 75,
            "task": 22,
            "text": "Опция 2. Cras tristique quam in sem posuere, vitae laoreet lectus dictum.",
            "correct": true
        },
        {
            "id": 76,
            "task": 22,
            "text": "Опция 3. Vestibulum non tellus sit amet libero dapibus venenatis eu feugiat lacus.",
            "correct": true
        },
        {
            "id": 77,
            "task": 23,
            "regEx": "\\d+"
        },
        {
            "id": 78,
            "task": 24,
            "text": "Опция 1. Cras ex odio, elementum eget blandit et, porta id est.",
            "correct": true
        },
        {
            "id": 79,
            "task": 24,
            "text": "Опция 2. Mauris consectetur neque nec ex rutrum, sit amet tristique orci venenatis.",
            "correct": true
        },
        {
            "id": 80,
            "task": 24,
            "text": "Опция 3. Praesent elit dui, scelerisque in mattis eu, lobortis eu quam.",
            "correct": true
        },
        {
            "id": 81,
            "task": 24,
            "text": "Опция 4. Duis justo turpis, auctor finibus justo at, ullamcorper sodales justo.",
            "correct": true
        },
        {
            "id": 82,
            "task": 24,
            "text": "Опция 5. Etiam pellentesque luctus dolor eget imperdiet.",
            "correct": true
        },
        {
            "id": 83,
            "task": 24,
            "text": "Опция 6. Curabitur turpis nisi, pretium vitae pulvinar ac, blandit ut ipsum.",
            "correct": true
        },
        {
            "id": 84,
            "task": 25,
            "text": "Опция 1. Integer pretium placerat neque, nec tincidunt tortor semper at.",
            "correct": false
        },
        {
            "id": 85,
            "task": 25,
            "text": "Опция 2. Maecenas ac odio in nisl sollicitudin porttitor ac in turpis.",
            "correct": false
        },
        {
            "id": 86,
            "task": 25,
            "text": "Опция 3. Donec quis tellus lectus.",
            "correct": true
        },
        {
            "id": 87,
            "task": 25,
            "text": "Опция 4. Nam vel efficitur erat.",
            "correct": false
        },
        {
            "id": 88,
            "task": 25,
            "text": "Опция 5. Etiam quis elit convallis, suscipit est ut, pretium diam.",
            "correct": false
        },
        {
            "id": 89,
            "task": 25,
            "text": "Опция 6. Aenean quis tellus eget nunc laoreet vestibulum sit amet eget massa.",
            "correct": false
        },
        {
            "id": 90,
            "task": 26,
            "text": "Опция 1. Sed bibendum, massa in semper dictum, neque enim faucibus sapien, non malesuada tortor velit a quam.",
            "correct": true
        },
        {
            "id": 91,
            "task": 26,
            "text": "Опция 2. Proin malesuada euismod enim nec bibendum.",
            "correct": true
        },
        {
            "id": 92,
            "task": 26,
            "text": "Опция 3. Integer pretium placerat neque, nec tincidunt tortor semper at.",
            "correct": false
        },
        {
            "id": 93,
            "task": 27,
            "regEx": "\\d+"
        },
        {
            "id": 94,
            "task": 28,
            "regEx": "\\d+"
        },
        {
            "id": 95,
            "task": 29,
            "text": "Опция 1. Etiam egestas velit dui.",
            "correct": true
        },
        {
            "id": 96,
            "task": 29,
            "text": "Опция 2. Nulla semper, odio eu elementum cursus, nisl purus commodo lectus, ut ultrices ipsum lectus quis leo.",
            "correct": true
        },
        {
            "id": 97,
            "task": 29,
            "text": "Опция 3. Nam placerat eros et pharetra vulputate.",
            "correct": true
        },
        {
            "id": 98,
            "task": 29,
            "text": "Опция 4. Quisque cursus felis a rhoncus dignissim.",
            "correct": true
        },
        {
            "id": 99,
            "task": 29,
            "text": "Опция 5. Pellentesque ac nisi purus.",
            "correct": true
        },
        {
            "id": 100,
            "task": 29,
            "text": "Опция 6. Maecenas gravida dolor eleifend nisl dictum semper.",
            "correct": false
        },
        {
            "id": 101,
            "task": 30,
            "text": "Опция 1. Proin malesuada euismod enim nec bibendum.",
            "correct": false
        },
        {
            "id": 102,
            "task": 30,
            "text": "Опция 2. Cras ac purus sed nulla faucibus posuere volutpat sit amet eros.",
            "correct": true
        },
        {
            "id": 103,
            "task": 30,
            "text": "Опция 3. Nullam tincidunt vulputate eleifend.",
            "correct": true
        },
        {
            "id": 104,
            "task": 30,
            "text": "Опция 4. Vestibulum ut vestibulum magna.",
            "correct": true
        },
        {
            "id": 105,
            "task": 30,
            "text": "Опция 5. Nunc varius imperdiet nisi a tempus.",
            "correct": false
        },
        {
            "id": 106,
            "task": 31,
            "regEx": "\\d+"
        },
        {
            "id": 107,
            "task": 32,
            "text": "Опция 1. Sed at lacinia felis.",
            "correct": true
        },
        {
            "id": 108,
            "task": 32,
            "text": "Опция 2. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "correct": false
        },
        {
            "id": 109,
            "task": 32,
            "text": "Опция 3. Sed tincidunt pellentesque elit, eget scelerisque nisi auctor et.",
            "correct": false
        },
        {
            "id": 110,
            "task": 33,
            "text": "Опция 1. Mauris placerat arcu augue, sed interdum massa rutrum in.",
            "correct": true
        },
        {
            "id": 111,
            "task": 33,
            "text": "Опция 2. Aenean quis tellus eget nunc laoreet vestibulum sit amet eget massa.",
            "correct": false
        },
        {
            "id": 112,
            "task": 33,
            "text": "Опция 3. Sed bibendum, massa in semper dictum, neque enim faucibus sapien, non malesuada tortor velit a quam.",
            "correct": false
        },
        {
            "id": 113,
            "task": 33,
            "text": "Опция 4. Aenean auctor dictum augue in placerat.",
            "correct": false
        },
        {
            "id": 114,
            "task": 33,
            "text": "Опция 5. Fusce nec luctus sapien, vitae viverra risus.",
            "correct": false
        },
        {
            "id": 115,
            "task": 33,
            "text": "Опция 6. Maecenas suscipit nec orci vel tempor.",
            "correct": false
        },
        {
            "id": 116,
            "task": 34,
            "text": "Опция 1. Integer ullamcorper lobortis euismod.",
            "correct": false
        },
        {
            "id": 117,
            "task": 34,
            "text": "Опция 2. Curabitur euismod velit massa, a sodales arcu ullamcorper at.",
            "correct": false
        },
        {
            "id": 118,
            "task": 34,
            "text": "Опция 3. Donec sit amet eros massa.",
            "correct": false
        },
        {
            "id": 119,
            "task": 34,
            "text": "Опция 4. Nulla semper, odio eu elementum cursus, nisl purus commodo lectus, ut ultrices ipsum lectus quis leo.",
            "correct": false
        },
        {
            "id": 120,
            "task": 34,
            "text": "Опция 5. Maecenas et dictum arcu, eget tristique risus.",
            "correct": true
        },
        {
            "id": 121,
            "task": 35,
            "text": "Опция 1. Proin ornare accumsan tempor.",
            "correct": false
        },
        {
            "id": 122,
            "task": 35,
            "text": "Опция 2. Mauris consequat porttitor lectus, ac porttitor dolor bibendum id.",
            "correct": true
        },
        {
            "id": 123,
            "task": 35,
            "text": "Опция 3. Vestibulum non tellus sit amet libero dapibus venenatis eu feugiat lacus.",
            "correct": false
        },
        {
            "id": 124,
            "task": 35,
            "text": "Опция 4. Maecenas quis porttitor lectus.",
            "correct": false
        },
        {
            "id": 125,
            "task": 35,
            "text": "Опция 5. Etiam et massa quis purus ornare fermentum sed eget sapien.",
            "correct": false
        },
        {
            "id": 126,
            "task": 36,
            "text": "Опция 1. Mauris placerat arcu augue, sed interdum massa rutrum in.",
            "correct": true
        },
        {
            "id": 127,
            "task": 36,
            "text": "Опция 2. Proin ornare accumsan tempor.",
            "correct": false
        },
        {
            "id": 128,
            "task": 36,
            "text": "Опция 3. Proin et iaculis nisl.",
            "correct": false
        },
        {
            "id": 129,
            "task": 37,
            "text": "Опция 1. Integer ullamcorper lobortis euismod.",
            "correct": false
        },
        {
            "id": 130,
            "task": 37,
            "text": "Опция 2. Cras ex odio, elementum eget blandit et, porta id est.",
            "correct": true
        },
        {
            "id": 131,
            "task": 37,
            "text": "Опция 3. Phasellus lacus massa, ornare eget orci ut, pretium dignissim tellus.",
            "correct": false
        },
        {
            "id": 132,
            "task": 37,
            "text": "Опция 4. Proin malesuada euismod enim nec bibendum.",
            "correct": true
        },
        {
            "id": 133,
            "task": 37,
            "text": "Опция 5. Vivamus sodales diam in leo volutpat, vitae tincidunt ligula fermentum.",
            "correct": false
        },
        {
            "id": 134,
            "task": 37,
            "text": "Опция 6. Duis turpis est, placerat ut sollicitudin a, sodales et felis.",
            "correct": true
        },
        {
            "id": 135,
            "task": 38,
            "text": "Опция 1. Donec eget ultricies lorem.",
            "correct": true
        },
        {
            "id": 136,
            "task": 38,
            "text": "Опция 2. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "correct": true
        },
        {
            "id": 137,
            "task": 38,
            "text": "Опция 3. Mauris placerat arcu augue, sed interdum massa rutrum in.",
            "correct": true
        },
        {
            "id": 138,
            "task": 38,
            "text": "Опция 4. Mauris consequat porttitor lectus, ac porttitor dolor bibendum id.",
            "correct": false
        },
        {
            "id": 139,
            "task": 38,
            "text": "Опция 5. Integer urna velit, pretium et lectus eu, finibus ullamcorper nulla.",
            "correct": true
        },
        {
            "id": 140,
            "task": 39,
            "text": "Опция 1. Etiam quis elit convallis, suscipit est ut, pretium diam.",
            "correct": true
        },
        {
            "id": 141,
            "task": 39,
            "text": "Опция 2. Sed tincidunt pellentesque elit, eget scelerisque nisi auctor et.",
            "correct": true
        },
        {
            "id": 142,
            "task": 39,
            "text": "Опция 3. Cras ex odio, elementum eget blandit et, porta id est.",
            "correct": true
        },
        {
            "id": 143,
            "task": 39,
            "text": "Опция 4. Maecenas quis porttitor lectus.",
            "correct": false
        },
        {
            "id": 144,
            "task": 40,
            "regEx": "\\d+"
        },
        {
            "id": 145,
            "task": 41,
            "text": "Опция 1. Morbi sed nisi eros.",
            "correct": true
        },
        {
            "id": 146,
            "task": 41,
            "text": "Опция 2. Morbi elit dolor, tristique luctus lectus et, bibendum consectetur dolor.",
            "correct": false
        },
        {
            "id": 147,
            "task": 41,
            "text": "Опция 3. Integer ullamcorper lobortis euismod.",
            "correct": false
        },
        {
            "id": 148,
            "task": 42,
            "text": "Опция 1. Fusce risus orci, scelerisque vitae elit sit amet, pretium viverra dolor.",
            "correct": false
        },
        {
            "id": 149,
            "task": 42,
            "text": "Опция 2. Aenean auctor dictum augue in placerat.",
            "correct": false
        },
        {
            "id": 150,
            "task": 42,
            "text": "Опция 3. Donec eget ultricies lorem.",
            "correct": true
        },
        {
            "id": 151,
            "task": 42,
            "text": "Опция 4. Vivamus sodales diam in leo volutpat, vitae tincidunt ligula fermentum.",
            "correct": false
        },
        {
            "id": 152,
            "task": 42,
            "text": "Опция 5. Vestibulum sit amet dictum neque.",
            "correct": false
        },
        {
            "id": 153,
            "task": 43,
            "text": "Опция 1. Maecenas tempus, risus et pulvinar placerat, mauris augue porta nulla, at congue neque leo at sem.",
            "correct": false
        },
        {
            "id": 154,
            "task": 43,
            "text": "Опция 2. Vivamus sodales diam in leo volutpat, vitae tincidunt ligula fermentum.",
            "correct": false
        },
        {
            "id": 155,
            "task": 43,
            "text": "Опция 3. Curabitur turpis nisi, pretium vitae pulvinar ac, blandit ut ipsum.",
            "correct": true
        },
        {
            "id": 156,
            "task": 43,
            "text": "Опция 4. Sed sollicitudin elementum elementum.",
            "correct": false
        },
        {
            "id": 157,
            "task": 44,
            "text": "Опция 1. Phasellus laoreet tortor molestie pharetra luctus.",
            "correct": false
        },
        {
            "id": 158,
            "task": 44,
            "text": "Опция 2. Praesent elit dui, scelerisque in mattis eu, lobortis eu quam.",
            "correct": false
        },
        {
            "id": 159,
            "task": 44,
            "text": "Опция 3. Cras tristique quam in sem posuere, vitae laoreet lectus dictum.",
            "correct": true
        },
        {
            "id": 160,
            "task": 44,
            "text": "Опция 4. Nulla vitae tortor interdum, ultricies urna in, finibus nisl.",
            "correct": false
        },
        {
            "id": 161,
            "task": 44,
            "text": "Опция 5. Pellentesque id elementum erat.",
            "correct": false
        },
        {
            "id": 162,
            "task": 45,
            "text": "Опция 1. Nunc pharetra elit dictum orci finibus tincidunt.",
            "correct": true
        },
        {
            "id": 163,
            "task": 45,
            "text": "Опция 2. Sed bibendum, massa in semper dictum, neque enim faucibus sapien, non malesuada tortor velit a quam.",
            "correct": true
        },
        {
            "id": 164,
            "task": 45,
            "text": "Опция 3. Donec efficitur volutpat nisl, quis hendrerit arcu posuere eu.",
            "correct": true
        },
        {
            "id": 165,
            "task": 45,
            "text": "Опция 4. Donec eget ultricies lorem.",
            "correct": true
        },
        {
            "id": 166,
            "task": 46,
            "text": "Опция 1. Nunc pharetra elit dictum orci finibus tincidunt.",
            "correct": true
        },
        {
            "id": 167,
            "task": 46,
            "text": "Опция 2. Maecenas tempus, risus et pulvinar placerat, mauris augue porta nulla, at congue neque leo at sem.",
            "correct": false
        },
        {
            "id": 168,
            "task": 46,
            "text": "Опция 3. Nam placerat eros et pharetra vulputate.",
            "correct": false
        },
        {
            "id": 169,
            "task": 47,
            "regEx": "\\d+"
        },
        {
            "id": 170,
            "task": 48,
            "text": "Опция 1. Vestibulum ut vestibulum magna.",
            "correct": false
        },
        {
            "id": 171,
            "task": 48,
            "text": "Опция 2. Curabitur euismod velit massa, a sodales arcu ullamcorper at.",
            "correct": false
        },
        {
            "id": 172,
            "task": 48,
            "text": "Опция 3. Vestibulum non tellus sit amet libero dapibus venenatis eu feugiat lacus.",
            "correct": true
        },
        {
            "id": 173,
            "task": 49,
            "regEx": "\\d+"
        },
        {
            "id": 174,
            "task": 50,
            "text": "Опция 1. Nam vel hendrerit urna.",
            "correct": false
        },
        {
            "id": 175,
            "task": 50,
            "text": "Опция 2. Donec eget ultricies lorem.",
            "correct": false
        },
        {
            "id": 176,
            "task": 50,
            "text": "Опция 3. Morbi et consequat massa.",
            "correct": true
        },
        {
            "id": 177,
            "task": 50,
            "text": "Опция 4. Nam condimentum imperdiet odio, vestibulum placerat neque.",
            "correct": false
        },
        {
            "id": 178,
            "task": 50,
            "text": "Опция 5. Proin et iaculis nisl.",
            "correct": false
        },
        {
            "id": 179,
            "task": 51,
            "text": "Опция 1. Mauris consequat porttitor lectus, ac porttitor dolor bibendum id.",
            "correct": false
        },
        {
            "id": 180,
            "task": 51,
            "text": "Опция 2. Ut lorem dolor, commodo a nibh sed, sagittis consectetur enim.",
            "correct": false
        },
        {
            "id": 181,
            "task": 51,
            "text": "Опция 3. Morbi mattis sit amet quam et fermentum.",
            "correct": false
        },
        {
            "id": 182,
            "task": 51,
            "text": "Опция 4. Mauris consectetur neque nec ex rutrum, sit amet tristique orci venenatis.",
            "correct": true
        }
    ]
}
