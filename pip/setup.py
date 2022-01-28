import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="by0websitegenerator",
    version="5.0.1",
    author="byZer0",
    author_email="mail@byzero.dev",
    description="Make a website in just 5 minutes!",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://generator.byzero.dev",
    project_urls={
        "Bug Tracker": "https://github.com/WebsiteGenerator/WebsiteGenerator/issues",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),
    python_requires=">=3.6",
   	py_modules=['websitegenerator'],
    entry_points='''
	[console_scripts]
	websitegenerator=wg:main
    generatewebsite=wg:main
    gw=wg:main
    makewebsite=wg:main
	'''
)
