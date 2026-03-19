# Movie Individual Ledger - Project Documentation

## 🎯 **Project Overview**
**Name**: Individual Ledger  
**Purpose**: Help people understand the true cost of watching movies beyond just ticket price  
**Target**: Movie-goers who want to make conscious entertainment choices  
**Value Prop**: "This movie cost you more than a ticket. It cost you life-hours and wellbeing changes."

## 🧠 **Core Logic & Business Rules**

### **Wellbeing Score (W) Calculation**
- **Baseline W**: 1.0 (neutral wellbeing state)
- **Range**: 0.4-1.2 (1.0 = neutral, higher = better, lower = worse)
- **Formula**: W = BASE_W + (physiology + emotions + thoughts + habits) × weights
  - Physiology: (calm + movement) × 0.5
  - Emotions: (joy + safety + connection) × 0.42  
  - Thoughts: (perspective + inspiration) × 0.5
  - Habits: (awareness + choice) × 0.42

### **Time Value Economics**
- **Base Hourly Rate**: Monthly salary ÷ working hours per month
- **Effective Hourly Rate**: Base rate × (current W ÷ baseline W)
- **Time Investment**: Sum of all movie-related time (pre, commute, movie, post, discussion)
- **Opportunity Cost**: Time × effective hourly rate

### **Financial Cost**
- **Direct Costs**: Ticket + snacks + travel + parking
- **Total Cost**: Direct costs + opportunity cost

### **Net Impact Calculation**
```
Net Impact = (Current W × Time × Effective Hourly) - (Baseline W × Time × Base Hourly) - Direct Money Costs
```

**Interpretation**:
- **Positive**: Movie added value to your life
- **Negative**: Movie drained your life value
- **Zero**: Movie was neutral

## 🎨 **User Experience Flow**

### **Step 1: Introduction**
- Explain the concept: Movies cost more than tickets
- Show the 5 dimensions: Physiology, Emotions, Thoughts, Habits, Performance
- Set expectations for the assessment

### **Step 2: Physiology Assessment**
- **Calm vs Restless**: How did your body respond?
- **Still vs Movement**: Did the movie energize you physically?
- **Scale**: -100 to +100 (negative = tense/still, positive = calm/moving)

### **Step 3: Emotional Assessment**
- **Joy vs Sadness**: Mood elevation/depression
- **Safety vs Fear**: Nervous system activation
- **Connection vs Isolation**: Social feeling
- **Scale**: -100 to +100 per emotion

### **Step 4: Cognitive Assessment**
- **Perspective Change**: New ways of thinking
- **Inspiration**: Motivation to create/act
- **Scale**: -100 to +100 per dimension

### **Step 5: Behavioral Assessment**
- **Pattern Awareness**: Recognizing old habits
- **Conscious Choice**: Future movie selection criteria
- **Scale**: -100 to +100 per dimension

### **Step 6: Practical Costs**
- **Income**: Monthly salary and working hours
- **Money Spent**: Ticket, food, transport, parking
- **Time Spent**: Pre-movie prep, commute, movie, post-movie, discussions

### **Step 7: Results & Reflection**
- **W Score**: Current wellbeing battery level
- **Value Created/Destroyed**: Net impact in rupees
- **Shareable Summary**: Social-ready format
- **Reset Option**: Start over with new movie

## 🎮 **Design Philosophy**

### **Game-like Experience**
- **Progress Tracking**: Visual step indicators
- **Animated Feedback**: Smooth transitions and hover effects
- **Achievement System**: Wellbeing battery with color coding
- **Storytelling**: Each screen tells part of the movie's impact story

### **Visual Design**
- **Color Psychology**: 
  - Green/Emerald: Money, positive outcomes
  - Blue/Purple: General UI, calm states
  - Orange/Red: Time, energy states
  - Pink/Rose: Emotions, social feelings
- **Gradient Backgrounds**: Subtle but engaging
- **Card-based Layout**: Clean, modern, interactive
- **Typography**: Gradient text for emphasis

### **Accessibility & UX**
- **Progressive Disclosure**: One concept at a time
- **Clear Labels**: Every slider has context
- **Visual Feedback**: Real-time W score updates
- **Mobile First**: Responsive design

## 🛠 **Technical Architecture**

### **State Management**
```typescript
type LedgerState = {
  salary: number;
  hoursPerMonth: number;
  money: { ticket: number; snacks: number; travel: number; parking: number };
  time: { pre: number; commute: number; movie: number; post: number; discussion: number };
  physiology: { calm: number; movement: number };
  emotions: { joy: number; safety: number; connection: number };
  thoughts: { perspective: number; inspiration: number };
  habits: { awareness: number; choice: number };
}
```

### **Key Functions**
- `computeW()`: Calculate wellbeing score
- `computeDerived()`: Calculate all economic impacts
- `clamp()`: Keep values in valid ranges
- `formatInr()`: Currency formatting

### **UI Components**
- **StepShell**: Consistent page wrapper with navigation
- **SliderBlock**: Interactive assessment controls
- **AvatarInsane**: Wellbeing visualization
- **StepManager**: Flow orchestration

## 📊 **Success Metrics**

### **User Engagement**
- **Completion Rate**: % who finish all 7 steps
- **Time to Complete**: Average assessment duration
- **Return Usage**: Users assessing multiple movies

### **Behavioral Impact**
- **Awareness**: Users reporting changed movie choices
- **Value Discovery**: Positive vs negative movie valuations
- **Sharing**: Social spread of results

### **Technical Performance**
- **Load Time**: < 2 seconds
- **Responsiveness**: Smooth 60fps animations
- **Accessibility**: WCAG AA compliance

## 🚀 **Future Enhancements**

### **Phase 2**
- **Movie Database Integration**: Pre-populate common movies
- **Social Features**: Compare with friends
- **Historical Tracking**: Personal movie history

### **Phase 3**
- **AI Recommendations**: Suggest movies based on wellbeing goals
- **Group Assessments**: Watch parties with shared ledgers
- **Advanced Analytics**: Wellbeing trends over time

---

## 🎯 **Current Status**
- **Problem**: Existing implementation has table-like UI that feels clinical
- **Solution**: Fresh rebuild with game-like, story-driven experience
- **Goal**: Make wellbeing assessment feel engaging and valuable, not like filling forms</content>
<parameter name="filePath">/Users/mosessampaul/Documents/TheIOV/Individual Repos/Movie-Dhurandhar-TimeValue/MOVIE_LEDGER_PROJECT.md