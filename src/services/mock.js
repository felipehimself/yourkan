import { v4 as uuidv4 } from 'uuid';


const mockState = {
  projectItems: [
    {
      id: uuidv4(),
      name: 'agreements',
      columns: [
        {
          colName: 'todo',
          color: 'info',
          colId: uuidv4(),
          colContent: [
            {
              title: 'change repository',
              desc: "it's necessary to change the place",
              contentId: uuidv4(),
            },
            {
              title: 'anything',
              desc: "some dumb text",
              contentId: uuidv4(),
            },
          ],
        },
        {
          colName: 'doing',
          color: 'warning',
          colId: uuidv4(),
          colContent: [
            {
              title: 'change mentality',
              desc: "working on that",
              contentId: uuidv4(),
            },
          ],
        },
        {
          colName: 'done',
          color: 'success',
          colId: uuidv4(),
          colContent: [
            {
              title: 'change repository',
              desc: "it's necessary to change the place",
              contentId: uuidv4(),
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      name: 'flutter',
      columns: [
        {
          colName: 'todo',
          color: 'info',
          colId: uuidv4(),
          colContent: [
            {
              title: 'change repository',
              desc: "it's necessary to change the place",
              contentId: uuidv4(),
            },
            {
              title: 'anything',
              desc: "some dumb text",
              contentId: uuidv4(),
            },
          ],
        },
        {
          colName: 'doing',
          color: 'warning',
          colId: uuidv4(),
          colContent: [
            {
              title: 'change repository',
              desc: "it's necessary to change the place",
              contentId: uuidv4(),
            },
          ],
        },
        {
          colName: 'done',
          color: 'success',
          colId: uuidv4(),
          colContent: [
            {
              title: 'change repository',
              desc: "it's necessary to change the place",
              contentId: uuidv4(),
            },
          ],
        },
      ],
    },
  ],
  isOpenDeleteProject: false,
  projectToEditId: ''
};

export default mockState