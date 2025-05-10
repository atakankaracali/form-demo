const stepsData = `
  <!-- Step 0: Intro -->
  <div class="form-step active" data-step="0">
    <h2>Welcome to Swedbank</h2>
    <p>Apply easily for your preferred product by answering a few simple questions.</p>
    <button id="start-btn">Start</button>
  </div>

  <!-- Step 1: Product (radio) -->
  <div class="form-step" data-step="1">
    <h2>1. What product are you applying for?</h2>
    <label><input type="radio" name="product" value="Credit Card" /> Credit Card</label><br />
    <label><input type="radio" name="product" value="Small Loan" /> Small Loan</label><br />
    <label><input type="radio" name="product" value="Car Leasing" /> Car Leasing</label />
    <div class="error-msg" id="error-step-1"></div>
    <div class="nav-buttons">
      <button class="prev-btn" disabled>Back</button>
      <button class="next-btn">Next</button>
    </div>
  </div>

  <!-- Step 2: Features (checkbox) + tooltip -->
  <div class="form-step" data-step="2">
    <h2>2. What features do you need? <span title="You can select multiple options."></span></h2>
    <label><input type="checkbox" name="features" value="Online Banking" /> Online Banking</label><br />
    <label><input type="checkbox" name="features" value="Insurance" /> Insurance</label><br />
    <label><input type="checkbox" name="features" value="Flexible Payments" /> Flexible Payments</label>
    <div class="error-msg" id="error-step-2"></div>
    <div class="nav-buttons">
      <button class="prev-btn">Back</button>
      <button class="next-btn">Next</button>
    </div>
  </div>

  <!-- Step 3: Dropdown -->
  <div class="form-step" data-step="3">
    <h2>3. Choose your preferred branch</h2>
    <select id="branch-select">
      <option value="">-- Select a branch --</option>
      <option value="Riga">Riga</option>
      <option value="Liepaja">Liepaja</option>
      <option value="Jelgava">Jelgava</option>
      <option value="Daugavpils">Daugavpils</option>
    </select>
    <div class="error-msg" id="error-step-3"></div>
    <div class="nav-buttons">
      <button class="prev-btn">Back</button>
      <button class="next-btn">Next</button>
    </div>
  </div>

  <!-- Step 4: Textarea -->
  <div class="form-step" data-step="4">
    <h2>4. Why do you need this product?</h2>
    <textarea id="reason" rows="4" placeholder="Type your answer..."></textarea>
    <div class="error-msg" id="error-step-4"></div>
    <div class="nav-buttons">
      <button class="prev-btn">Back</button>
      <button class="next-btn">Next</button>
    </div>
  </div>

  <!-- Step 5: Confirm (checkbox) -->
  <div class="form-step" data-step="5">
    <h2>5. Confirm that all information is correct</h2>
    <label><input type="checkbox" id="confirm" /> I confirm the information provided is correct</label>
    <div class="error-msg" id="error-step-5"></div>
    <div class="nav-buttons">
      <button class="prev-btn">Back</button>
      <button class="next-btn">Next</button>
    </div>
  </div>

  <!-- Step 6: Summary -->
  <div class="form-step" data-step="6">
    <h2>Summary</h2>
    <div id="summary"></div>
    <button id="restart-btn">Start Over</button>
  </div>
`;

document.getElementById("form-step-container").innerHTML = stepsData;

let currentStep = 0;
const steps = document.querySelectorAll('.form-step');

const formData = {
  product: '',
  features: [],
  branch: '',
  reason: '',
  confirmed: false
};

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
  currentStep = index;
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'start-btn') showStep(1);
  if (e.target.classList.contains('next-btn')) {
    if (!validateStep(currentStep)) return;
    if (currentStep === 5) generateSummary();
    showStep(currentStep + 1);
  }
  if (e.target.classList.contains('prev-btn')) {
    showStep(currentStep - 1);
  }
  if (e.target.id === 'restart-btn') {
    location.reload();
  }
});

function validateStep(step) {
  switch (step) {
    case 1:
      const selected = document.querySelector('input[name="product"]:checked');
      const error1 = document.getElementById('error-step-1');
      if (!selected) {
        error1.textContent = 'Please select a product.';
        return false;
      }
      error1.textContent = '';
      formData.product = selected.value;
      return true;

    case 2:
      const checked = Array.from(document.querySelectorAll('input[name="features"]:checked')).map(i => i.value);
      const error2 = document.getElementById('error-step-2');
      if (checked.length === 0) {
        error2.textContent = 'Please select at least one feature.';
        return false;
      }
      error2.textContent = '';
      formData.features = checked;
      return true;

    case 3:
      const select = document.getElementById('branch-select');
      const error3 = document.getElementById('error-step-3');
      if (!select.value) {
        error3.textContent = 'Please choose a branch.';
        return false;
      }
      error3.textContent = '';
      formData.branch = select.value;
      return true;

    case 4:
      const reason = document.getElementById('reason').value.trim();
      const error4 = document.getElementById('error-step-4');
      if (!reason) {
        error4.textContent = 'Please explain your reason.';
        return false;
      }
      error4.textContent = '';
      formData.reason = reason;
      return true;

    case 5:
      const confirmed = document.getElementById('confirm').checked;
      const error5 = document.getElementById('error-step-5');
      if (!confirmed) {
        error5.textContent = 'You must confirm the information.';
        return false;
      }
      error5.textContent = '';
      formData.confirmed = true;
      return true;

    default:
      return true;
  }
}

function generateSummary() {
  const summary = document.getElementById('summary');
  summary.innerHTML = `
    <ul>
      <li><strong>Product:</strong> ${formData.product}</li>
      <li><strong>Features:</strong> ${formData.features.join(', ')}</li>
      <li><strong>Branch:</strong> ${formData.branch}</li>
      <li><strong>Reason:</strong> ${formData.reason}</li>
      <li><strong>Confirmed:</strong> ${formData.confirmed ? 'Yes' : 'No'}</li>
    </ul>
  `;
}
