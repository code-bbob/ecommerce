import React, { useState } from 'react';

export function BlogPost(){

        const [formData, setFormData] = useState({
          title: '',
          author: '',
          introduction: '',
          body: '',
          conclusion: '',
          image: '',
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Add your logic to handle form submission (e.g., post data to a server)
          console.log('Form submitted:', formData);
        };
    return (
        <>
       <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>

      <label>
        Introduction:
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
        />
      </label>

      <label>
        Body:
        <textarea name="body" value={formData.body} onChange={handleChange} />
      </label>

      <label>
        Conclusion:
        <textarea
          name="conclusion"
          value={formData.conclusion}
          onChange={handleChange}
        />
      </label>

      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
        </>
    )
};