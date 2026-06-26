plugins {
    id("java")
    antlr
}

group = "io.Cbuild"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    maven {
        url = uri("https://company/com/maven2")
    }
    mavenLocal()
    flatDir {
        dirs("libs")
    }
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:6.0.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    antlr("org.antlr:antlr4:4.13.2")
    implementation("org.antlr:antlr4-runtime:4.13.2")
}

tasks.test {
    useJUnitPlatform()
}

tasks.generateGrammarSource {
    maxHeapSize = "64m"
    arguments = arguments + listOf("-visitor", "-long-messages")
}


tasks.generateTestGrammarSource {
    // Arguments applied specifically to your test-only grammars
    arguments = arguments + listOf("-visitor", "-package", "io.github.parser")
}

