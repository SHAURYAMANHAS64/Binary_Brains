document.addEventListener('DOMContentLoaded', () => {
    const blogPostForm = document.getElementById('blog-post-form');
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Load existing blog posts from local storage
    function loadBlogPosts() {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogPostsContainer.innerHTML = '';
        
        blogPosts.forEach((post, index) => {
            const postElement = createBlogPostElement(post, index);
            blogPostsContainer.appendChild(postElement);
        });
    }

    // Create blog post element
    function createBlogPostElement(post, index) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `
            <span class="category">${post.category}</span>
            <h3>${post.title}</h3>
            <div class="experience">
                <strong>Experience:</strong>
                <p>${post.experience}</p>
            </div>
            <div class="key-takeaway">
                <strong>Key Takeaway:</strong>
                <p>${post.keyTakeaway}</p>
            </div>
            <button onclick="deleteBlogPost(${index})">Delete</button>
        `;
        return postDiv;
    }

    // Save blog post to local storage
    function saveBlogPost(post) {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogPosts.push(post);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    }

    // Delete blog post
    window.deleteBlogPost = function(index) {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogPosts.splice(index, 1);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        loadBlogPosts();
    }

    // Submit blog post form
    blogPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const post = {
            category: document.getElementById('category').value,
            title: document.getElementById('title').value,
            experience: document.getElementById('experience').value,
            keyTakeaway: document.getElementById('key-takeaway').value
        };

        saveBlogPost(post);
        loadBlogPosts();
        
        // Reset form
        blogPostForm.reset();
    });

    // Search functionality
    searchButton.addEventListener('click', () => filterBlogPosts());
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterBlogPosts();
    });

    function filterBlogPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        const blogPosts = document.querySelectorAll('.blog-post');

        blogPosts.forEach(post => {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const experience = post.querySelector('.experience p').textContent.toLowerCase();
            const category = post.querySelector('.category').textContent.toLowerCase();

            if (title.includes(searchTerm) || 
                experience.includes(searchTerm) || 
                category.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    // Initial load of blog posts
    loadBlogPosts();
});