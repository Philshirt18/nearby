# Nearby - Where Neighbours Become Helpers

## GNEC Hackathon 2025 Fall Submission
**Theme:** SDG 1 (No Poverty) & SDG 2 (Zero Hunger)

## The Problem

1.3 billion people live in poverty and 735 million face hunger globally. Yet within communities, there's often surplus food going to waste, unused land, valuable skills not being shared, and neighbors who would help if they knew who needed it. The gap isn't resources - it's trust and coordination at the hyperlocal level.

## Our Solution

Nearby is a hyperlocal resource-sharing platform that enables neighbors to exchange food, meals, land access, skills, and volunteer support without requiring money. By focusing on building trust within walking distance, we create resilient community networks that directly address poverty and hunger.

## How It Addresses UN SDGs

### SDG 1: No Poverty
- Enables access to resources and services without cash through skill exchange
- Builds social capital and community support networks
- Provides crisis support through volunteer coordination
- Reduces economic barriers to accessing food, education, and assistance

### SDG 2: Zero Hunger
- Connects surplus food producers with those in need
- Facilitates meal sharing and community cooking
- Enables community gardens on unused land
- Reduces food waste by creating local distribution networks

## Key Features

- **Food & Meal Marketplace**: Fresh produce, prepared meals, and bulk food sharing with flexible payment (cash, skill exchange, or free)
- **Land Sharing**: Connect unused garden space with people who want to grow food
- **Skill Exchange**: Trade services without money - tutoring, repairs, language lessons, childcare
- **Volunteer Board**: Emergency coordination for crisis situations (medical transport, childcare, food assistance)
- **Privacy-First Messaging**: In-app communication protects user privacy before sharing contact details
- **Hyperlocal Filtering**: Distance-based search builds neighborhood-level trust and reduces transportation barriers

## Real-World Impact

### Example Use Cases from Our Platform:
- **Pedro's Fresh Tomatoes**: 50kg of fresh produce at €1.50/kg (vs €3.50 in supermarkets) or available through harvest help
- **María's Tutoring Exchange**: Single mother trades house cleaning for math tutoring for her children
- **Ahmed's Language Exchange**: Refugee teaches Arabic/French in exchange for bicycle repair lessons
- **Community Garden Initiative**: Half-acre plot shared among 10 families for cooperative food growing
- **Medical Transport Volunteers**: Neighbors coordinate rides for chemotherapy appointments

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Deployment**: Netlify (serverless)
- **Architecture**: Progressive Web App for mobile-first access

## Live Demo

**URL**: https://nearby1.netlify.app

The app is deployed and fully functional. Open on mobile for the best experience.

### Installing Nearby as a Mobile App

Nearby is a Progressive Web App (PWA) that can be installed on your phone like a native app:

#### On iPhone (Safari):
1. Open https://nearby1.netlify.app in Safari
2. Tap the **Share button** (square with arrow pointing up)
3. Scroll down and select **"Add to Home Screen"**
4. Tap **"Add"** to confirm
5. Nearby now appears as an app icon on your home screen

#### On Android (Chrome):
1. Open https://nearby1.netlify.app in Chrome
2. Tap the **three dots menu (⋮)** in the top-right corner
3. Select **"Add to Home screen"**
4. Tap **"Add"** to confirm
5. Nearby now appears as an app icon on your home screen

Once installed, Nearby works just like a regular app - full-screen, fast, and always a tap away. The PWA approach ensures immediate accessibility without app store approval delays, while maintaining the option to package and publish to the Apple App Store or Google Play Store for wider distribution in the future.

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Access at `http://localhost:5174`

## Design Philosophy

**Hyperlocal by Design**: We focus on neighborhoods because trust exists at the walking-distance level. Global platforms can't build the relationships needed for vulnerable people to safely access resources.

**Privacy First**: Users can communicate in-app before sharing personal information, protecting those in vulnerable situations.

**Money Optional**: All exchanges can happen through skill trading, making the platform accessible to those with no cash.

**Crisis Ready**: The volunteer board enables rapid community response to emergencies without requiring formal aid organizations.

## Scalability

Nearby scales horizontally across neighborhoods worldwide. Each community becomes self-sustaining while the platform provides trust infrastructure, privacy tools, and coordination features. The model works in both wealthy areas (reducing waste) and economically challenged neighborhoods (enabling resource access).

## Future Development

- Push notifications for urgent volunteer requests
- Integration with local food banks and aid organizations
- Calendar integration for volunteer scheduling
- Multi-language support for refugee communities
- Reputation system for trust building

## Team

Paul - Full-stack developer

## License

MIT License - Free to use and modify for community benefit

---

**Contact**: For questions or partnership opportunities regarding this project, please reach out through the hackathon platform.