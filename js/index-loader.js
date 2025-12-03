// Index Page - Load course topics from units.json
async function loadCourseTopics() {
  try {
    const response = await fetch('data/units.json');
    const data = await response.json();
    
    const units = data.units;
    
    // Build the topics HTML with tabbed interface
    let topicsHTML = '<h2 style="margin-top: 3rem;">Course Topics</h2>';
    
    // Create tabs
    topicsHTML += '<div class="tabs-container"><div class="tabs">';
    units.forEach((unit, index) => {
      const activeClass = index === 0 ? 'active' : '';
      topicsHTML += `<button class="tab-button ${activeClass}" onclick="switchTab(${index})">Unit ${unit.number}</button>`;
    });
    topicsHTML += '</div>';
    
    // Create tab content
    topicsHTML += '<div class="tab-contents">';
    units.forEach((unit, index) => {
      const activeClass = index === 0 ? 'active' : '';
      topicsHTML += `
        <div class="tab-content ${activeClass}" id="tab-${index}">
          <h3>${unit.title}</h3>
          <ul class="list">`;
      
      unit.outline.forEach(item => {
        // Extract week number from outline string
        const weekMatch = item.match(/Week (\d+)/);
        if (weekMatch) {
          const weekNum = weekMatch[1];
          topicsHTML += `<li><a href="templates/week-template.html?week=${weekNum}&page=intro">${item}</a></li>`;
        } else {
          topicsHTML += `<li>${item}</li>`;
        }
      });
      
      topicsHTML += '</ul></div>';
    });
    topicsHTML += '</div></div>';
    
    // Insert before the additional resources section
    const container = document.querySelector('.container');
    const additionalResources = container.querySelector('[style*="margin-top: 3rem"]');
    
    if (additionalResources) {
      additionalResources.insertAdjacentHTML('beforebegin', topicsHTML);
    }
    
  } catch (error) {
    console.error('Error loading course topics:', error);
  }
}

// Tab switching function
function switchTab(tabIndex) {
  // Remove active class from all tabs and contents
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Add active class to selected tab and content
  document.querySelectorAll('.tab-button')[tabIndex].classList.add('active');
  document.getElementById(`tab-${tabIndex}`).classList.add('active');
}

// Load topics when page loads
document.addEventListener('DOMContentLoaded', loadCourseTopics);