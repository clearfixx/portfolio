// import type { Project } from '@/payload-types'

// import { FeaturedProjectsIntro } from './FeaturedProjectsIntro'
// import { ProjectCard } from './ProjectCard'

// type FeaturedProjectsProps = {
//   projects: Project[]
// }

// export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
//   const [primaryProject, ...secondaryProjects] = projects

//   return (
//     <section className="featured-projects-section" id="projects">
//       <div className="site-container">
//         <FeaturedProjectsIntro />

//         {projects.length > 0 ? (
//           <div className="featured-projects__layout">
//             <ProjectCard project={primaryProject} variant="primary" />

//             {secondaryProjects.length > 0 ? (
//               <div className="featured-projects__secondary-grid">
//                 {secondaryProjects.map((project) => (
//                   <ProjectCard project={project} key={project.id} />
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         ) : (
//           <div className="featured-projects__empty">
//             <p className="featured-projects__empty-kicker">Mission archive is empty</p>

//             <h3>Featured projects have not been added yet.</h3>

//             <p>
//               Тут поки ще немає контенту, але незабаром буде багато цікавого: проєкти,
//               експерименти, технічні кейси та живі статуси розробки.
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }

import { featuredProjects } from './data'
import { FeaturedProjectsIntro } from './FeaturedProjectsIntro'
import { ProjectCard } from './ProjectCard'

export function FeaturedProjects() {
  const [primaryProject, ...secondaryProjects] = featuredProjects

  return (
    <section className="featured-projects-section" id="projects">
      <div className="site-container">
        <FeaturedProjectsIntro />

        <div className="featured-projects__layout">
          <ProjectCard project={primaryProject} variant="primary" />

          <div className="featured-projects__secondary-grid">
            {secondaryProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
