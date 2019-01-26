exports.seed = (knex, Promise) => {
  return knex('palettes').del()
  .then(() => knex('projects').del())
  .then(() => {
    return Promise.all([
      knex('projects')
      .insert([{title: 'Palace Adidas'}, {title: 'Nike SB Blazer'}], 'id')
      .then(() => {
        return knex('palettes').insert([
          {
            title: 'lev colorway', 
            color_one: '#516950', 
            color_two: '#778972', 
            color_three: '#778972', 
            color_four: '#9B2A42', 
            color_five: '#F4EA84', 
            project_id: project[0]
          }, 
          {
            title: 'ishod colorway', 
            color_one: '#211A23', 
            color_two: '#537060', 
            color_three: '#E59D60',
            color_four: '#E99353', 
            color_five: '#F5A158', 
            project_id: project[0]
          }
        ]); 
      })
      .then(() => console.log('Seeding Complete!'))
      .catch(error => console.log(`Error Seeding Data: ${error}`))
    ]); 
  })
  .catch(error => console.log(`Error Seeding Data: ${error}`))
}; 