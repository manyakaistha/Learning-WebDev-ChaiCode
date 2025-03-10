# JavaScript Execution Model Flowcharts

## Table of Contents

1. [JavaScript Runtime Environment](#javascript-runtime-environment)
2. [Event Loop Overview](#event-loop-overview)
3. [Execution Priority](#execution-priority)
4. [Asynchronous Operations Flow](#asynchronous-operations-flow)
5. [Common Asynchronous Patterns](#common-asynchronous-patterns)

## JavaScript Runtime Environment

This diagram shows the main components of the JavaScript runtime environment and how they interact with each other.

```mermaid
sequenceDiagram
    participant MH as Memory Heap
    participant CS as Call Stack
    participant WA as Web APIs
    participant MQ as Microtask Queue
    participant CQ as Callback Queue
    participant EL as Event Loop
    
    Note over MH,EL: JavaScript Runtime Environment
    
    Note over MH,CS: JavaScript Engine
    Note over WA: Web APIs / Node APIs
    Note over MQ,CQ: Task Queues
    
    CS->>WA: 1. Execute Code
    WA-->>MQ: 2a. Task Complete (Promises)
    WA-->>CQ: 2b. Task Complete (setTimeout, DOM events)
    MQ->>EL: 3. Process First (Higher Priority)
    CQ->>EL: 4. Process Second (Lower Priority)
    EL->>CS: 5. Push Callback to Call Stack
    
    Note over WA: DOM API, setTimeout/setInterval,
    Note over WA: fetch/XMLHttpRequest, Event Listeners
    Note over MQ: Microtask Queue (Promise callbacks)
    Note over CQ: Callback Queue/Task Queue
```

## Event Loop Overview

The event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.

```mermaid
sequenceDiagram
    participant CS as Call Stack
    participant JSE as JavaScript Engine
    participant EL as Event Loop
    participant MQ as Microtask Queue
    participant R as Render
    participant CQ as Callback Queue
    
    CS->>JSE: 1. Execute Code
    JSE->>EL: 2. Empty Stack
    EL->>MQ: 3. Check Microtask Queue
    MQ-->>EL: 4. Process All Microtasks
    EL->>R: 5. UI Updates
    EL->>CQ: 6. Check Callback Queue
    CQ-->>CS: 7. Process One Callback
    
    Note over CS,CQ: Event Loop Cycle
```

## Execution Priority

This diagram illustrates the priority order in which JavaScript executes different types of code.

```mermaid
sequenceDiagram
    participant SC as Synchronous Code
    participant CS as Call Stack
    participant MT as Microtasks
    participant MA as Macrotasks
    
    Note over SC: 1. Highest Priority
    SC->>CS: Call Stack Execution
    
    Note over MT: 2. Second Priority
    MT->>CS: Promise Callbacks
    MT->>CS: queueMicrotask()
    MT->>CS: process.nextTick() (Node.js)
    MT->>CS: MutationObserver (Browser)
    
    Note over MA: 3. Third Priority
    MA->>CS: setTimeout/setInterval
    MA->>CS: I/O Operations
    MA->>CS: UI Rendering
    MA->>CS: Event Callbacks
    
    Note over SC,MA: JavaScript Execution Priority
```

## Asynchronous Operations Flow

This diagram shows how asynchronous operations flow through the JavaScript runtime.

```mermaid
sequenceDiagram
    participant MH as Memory Heap
    participant CS as Call Stack
    participant WA as Web APIs
    participant MQ as Microtask Queue
    participant CQ as Callback Queue/Task Queue
    participant EL as Event Loop
    
    Note over CS: JavaScript code execution begins
    CS->>WA: 1. Execute Code (API calls, timers, events)
    WA-->>MQ: 2a. Task Complete (Promise callbacks)
    WA-->>CQ: 2b. Task Complete (setTimeout, DOM events)
    MQ->>EL: 3. Process First (Higher Priority)
    CQ->>EL: 4. Process Second (Lower Priority)
    EL->>CS: 5. Push Callback to Call Stack
    
    Note over MH,EL: JavaScript Runtime Environment Components
    Note over CS: console.log("Start")
    Note over CS: setTimeout callback registered
    CS->>WA: setTimeout(fn, 0)
    Note over CS: Promise.resolve().then()
    CS->>MQ: Promise callback queued
    Note over CS: console.log("End")
    
    Note over EL: Call Stack Empty - Check Microtask Queue
    EL->>MQ: Process Microtasks
    MQ->>CS: Execute Promise callback
    Note over CS: console.log("Promise callback")
    
    WA->>CQ: setTimeout completed
    Note over EL: Check Callback Queue
    EL->>CQ: Process Callback Queue
    CQ->>CS: Execute setTimeout callback
    Note over CS: console.log("Timeout callback")
    
    Note over CS,EL: Final Output:
    Note over CS,EL: Start
    Note over CS,EL: End
    Note over CS,EL: Promise callback
    Note over CS,EL: Timeout callback
```

## Common Asynchronous Patterns

This diagram illustrates common asynchronous patterns in JavaScript and how they interact with the event loop.

```mermaid
sequenceDiagram
    participant CB as Callbacks
    participant PR as Promises
    participant AA as Async/Await
    participant CQ as Callback Queue
    participant MQ as Microtask Queue
    participant CS as Call Stack
    
    Note over CB: setTimeout/setInterval, XMLHttpRequest
    CB->>CQ: Added to Callback Queue
    CQ->>CS: Processed after Microtasks
    
    Note over PR: fetch API, Promise Constructor
    PR->>MQ: Added to Microtask Queue
    MQ->>CS: Processed before Callbacks
    PR->>PR: Can be chained (.then, .catch)
    
    Note over AA: Syntactic Sugar over Promises
    AA->>PR: Uses Promises internally
    AA->>CS: await suspends function execution
    PR-->>AA: Function resumes when Promise settles
    
    Note over CB,AA: Common Asynchronous Patterns
```