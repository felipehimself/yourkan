import { v4 as uuidv4 } from 'uuid';


const mockState = {
  projectItems: [
    {
      id: uuidv4(),
      name: 'Agreements',
      columns: [
        {
          colName: 'todo',
          color: 'info',
          colId: uuidv4(),
          colContent: [
            {
              title: 'law department review',
              desc: "it's necessary to check all clauses",
              contentId: uuidv4(),
            },
            {
              title: 'meeting with the client',
              desc: "it's necessary to schedule a meeting",
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
              title: 'drawing up a new draft',
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
              title: 'monthly conferece call',
              desc: "scheduled to August 30, 2022",
              contentId: uuidv4(),
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      name: 'Monthly meeting',
      columns: [
        {
          colName: 'todo',
          color: 'info',
          colId: uuidv4(),
          colContent: [
            {
              title: 'breafing',
              desc: "discuss main topics with the team",
              contentId: uuidv4(),
            },
            {
              title: 'next project addressing',
              desc: "address to each one their next project",
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
              title: 'develop the presentation',
              desc: "it's has being done",
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
              title: 'putting together all topics',
              desc: "create a list with all topics to be discussed",
              contentId: uuidv4(),
            },
          ],
        },
      ],
    },
  ],

  isOpenDeleteProject: false,
  isOpenTaskModal: false,
  taskToEdit: null,
  projectToEditId: '',
};

export default mockState