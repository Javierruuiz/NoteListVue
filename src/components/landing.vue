<script setup>
  
</script>

<template>
 <div class="landing-container">
    <header class="hero">
        <h1>YOUR REMINDERS MADE EASY, SAFE, AND EFFECTIVE</h1>
        <p>Organize your tasks, stay on track, and never forget something important.</p>
        <a href="https://github.com/Javierruuiz" class="cta-button">By Javier Ruiz</a>


    </header>

    <section class="features">
        <div class="feature">
            <h2>Easy to Use</h2>
            <p>A simple and user-friendly interface for everyone.</p>
        </div>
        <div class="feature">
            <h2>Guaranteed Security</h2>
            <p>Your data will always be protected.</p>
        </div>
        <div class="feature">
            <h2>Perfect Organization</h2>
            <p>Effortlessly categorize and prioritize your tasks.</p>
        </div>
    </section>
</div>

</template>

<style scoped>
.landing-container {
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 20px;
  color: #333;
}

.hero {
  background: #f7f9fc;
  padding: 50px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5rem;
  color: #222;
}

.hero p {
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
}

.cta-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  text-decoration: none;  
}

.cta-button:hover {
  background: #0056b3;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.feature {
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature h2 {
  font-size: 1.5rem;
  color: #222;
  margin-bottom: 10px;
}

.feature p {
  font-size: 1rem;
  color: #666;
}
</style>
