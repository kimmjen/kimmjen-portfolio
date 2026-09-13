import re

def process(content):
    # Adjust backgrounds
    c = content.replace("bg-gray-50", "bg-[var(--section-bg)]")
    c = c.replace("bg-white", "bg-[var(--card-background)]")
    
    # Adjust text colors
    c = c.replace("text-gray-900", "text-[var(--foreground)]")
    c = c.replace("text-gray-800", "text-[var(--foreground)]")
    c = c.replace("text-gray-700", "text-[var(--text-secondary)]")
    c = c.replace("text-gray-600", "text-[var(--text-muted)]")
    c = c.replace("text-gray-500", "text-[var(--text-tertiary)]")
    
    # Adjust borders
    c = c.replace("border-gray-800", "border-[var(--foreground)]")
    c = c.replace("border-gray-900", "border-[var(--foreground)]")
    c = c.replace("border-gray-200", "border-[var(--border-color)]")
    c = c.replace("border-gray-300", "border-[var(--border-color)]")
    
    # Monochrome blue accents
    c = c.replace("text-blue-600", "text-[var(--accent)]")
    c = c.replace("bg-blue-600", "bg-[var(--accent)] border border-[var(--border-color)]")
    
    # Handle the "Download PDF" button text color explicitly
    c = c.replace("bg-[var(--accent)] border border-[var(--border-color)] text-white", "bg-[var(--accent)] text-[var(--accent-text)] border border-[var(--border-color)]")

    c = c.replace("hover:bg-blue-700", "hover:opacity-80")
    c = c.replace("bg-blue-100", "bg-[var(--accent-light)]")
    c = c.replace("text-blue-800", "text-[var(--accent)]")
    
    # Unified Monochrome Accent borders and backgrounds for sections (Education, Experience, Skills, Projects)
    c = c.replace("hover:border-green-500", "hover:border-[var(--foreground)]")
    c = c.replace("bg-green-600", "bg-[var(--accent)]")
    c = c.replace("hover:border-purple-500", "hover:border-[var(--foreground)]")
    c = c.replace("bg-purple-600", "bg-[var(--accent)]")
    c = c.replace("bg-orange-600", "bg-[var(--accent)]")
    c = c.replace("hover:border-red-500", "hover:border-[var(--foreground)]")
    c = c.replace("bg-red-600", "bg-[var(--accent)]")
    
    # Custom print styles cleanup
    c = c.replace("background: white !important;", "background: var(--card-background) !important;")
    return c

paths = [
  "src/app/resume/page.tsx",
  "src/app/resumev2/page.tsx"
]

for p in paths:
    with open(p, "r") as f:
        content = f.read()
    with open(p, "w") as f:
        f.write(process(content))
        print(f"Updated {p}")

